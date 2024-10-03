Para un programa de presupuestos, la estructura de la base de datos debe estar diseñada de manera que permita gestionar proyectos, partidas (grupos de trabajo), precios unitarios, insumos (materiales, mano de obra, etc.), y cualquier otra información necesaria para crear un presupuesto detallado. A continuación, te propongo una estructura básica y extensible, que puede adaptarse según las necesidades del proyecto.

### Tablas principales para la base de datos de presupuestos

1. **Proyectos**: 
   Esta tabla almacenará información sobre cada proyecto en el que se trabajarán los presupuestos.

   ```sql
   CREATE TABLE proyectos (
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(255) NOT NULL,
     cliente VARCHAR(255),
     fecha_inicio DATE,
     fecha_fin DATE,
     estado VARCHAR(50),
     descripcion TEXT
   );
   ```

2. **Partidas**: 
   Las partidas son secciones dentro del presupuesto que agrupan conceptos de trabajo.

   ```sql
   CREATE TABLE partidas (
     id SERIAL PRIMARY KEY,
     proyecto_id INT REFERENCES proyectos(id),
     nombre VARCHAR(255) NOT NULL,
     descripcion TEXT
   );
   ```

3. **Precios Unitarios**: 
   Los precios unitarios incluyen los costos de cada concepto de trabajo o actividad que será parte del presupuesto.

   ```sql
   CREATE TABLE precios_unitarios (
     id SERIAL PRIMARY KEY,
     descripcion VARCHAR(255) NOT NULL,
     unidad VARCHAR(50),  -- Ejemplo: "m2", "pieza", etc.
     costo_unitario DECIMAL(10, 2) NOT NULL
   );
   ```

4. **Insumos**: 
   Los insumos representan los materiales, mano de obra, herramientas, etc., necesarios para los precios unitarios.

   ```sql
   CREATE TABLE insumos (
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(255) NOT NULL,
     tipo VARCHAR(50),  -- Ejemplo: "material", "mano de obra", "herramienta"
     unidad VARCHAR(50), -- Ejemplo: "kg", "metro", "hora"
     costo_unitario DECIMAL(10, 2) NOT NULL
   );
   ```

5. **Relación Precios Unitarios - Insumos**: 
   Dado que cada precio unitario puede requerir varios insumos, se necesita una tabla intermedia para establecer esa relación.

   ```sql
   CREATE TABLE precio_unitario_insumos (
     id SERIAL PRIMARY KEY,
     precio_unitario_id INT REFERENCES precios_unitarios(id),
     insumo_id INT REFERENCES insumos(id),
     cantidad DECIMAL(10, 2) NOT NULL  -- Cantidad de insumo requerida para ese precio unitario
   );
   ```

6. **Presupuestos**: 
   Esta tabla registra los presupuestos generados, vinculándolos con un proyecto.

   ```sql
   CREATE TABLE presupuestos (
     id SERIAL PRIMARY KEY,
     proyecto_id INT REFERENCES proyectos(id),
     fecha_creacion DATE DEFAULT CURRENT_DATE,
     estado VARCHAR(50) DEFAULT 'en progreso'
   );
   ```

7. **Detalles del Presupuesto**: 
   Aquí se almacenan los detalles del presupuesto, asociando partidas y precios unitarios.

   ```sql
   CREATE TABLE presupuesto_detalle (
     id SERIAL PRIMARY KEY,
     presupuesto_id INT REFERENCES presupuestos(id),
     partida_id INT REFERENCES partidas(id),
     precio_unitario_id INT REFERENCES precios_unitarios(id),
     cantidad DECIMAL(10, 2) NOT NULL,  -- Cantidad de precio unitario aplicado en el presupuesto
     total DECIMAL(10, 2) GENERATED ALWAYS AS (cantidad * (SELECT costo_unitario FROM precios_unitarios WHERE id = precio_unitario_id)) STORED
   );
   ```

### Relación entre las tablas

1. **Proyectos** puede tener muchas **partidas**.
2. Cada **partida** tiene varios **precios unitarios** que la componen.
3. Cada **precio unitario** se calcula a partir de varios **insumos**.
4. Un **presupuesto** es la combinación de varias **partidas**, y cada partida tiene varios **precios unitarios**.

### Flujo de datos

1. **Crear un presupuesto**: Se selecciona un proyecto, luego se seleccionan las partidas, y para cada partida, se eligen los precios unitarios.
2. **Asignación de insumos**: Cada precio unitario puede requerir varios insumos. La tabla intermedia `precio_unitario_insumos` vincula los insumos con la cantidad específica que requiere cada precio unitario.
3. **Cálculo total**: Los detalles del presupuesto (`presupuesto_detalle`) contienen la cantidad de cada precio unitario y calculan el costo total automáticamente utilizando una expresión calculada.

### Ampliaciones posibles

1. **Historial de cambios**: Se podría agregar una tabla de versiones de presupuestos o auditoría para registrar las modificaciones realizadas.
2. **Facturación**: Se pueden crear tablas adicionales para facturación o seguimiento de pagos.
3. **Usuarios y permisos**: Se puede agregar control de usuarios para definir quién tiene acceso a los proyectos y presupuestos.

Este diseño cubre lo esencial para gestionar un sistema de presupuestos detallado y con capacidad de crecimiento. ¿Te gustaría ajustar algo o necesitas alguna tabla adicional?
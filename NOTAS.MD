# Notas del Proyecto - Reflexión sobre Testing

### 1. ¿Qué ventaja tiene escribir los tests ANTES de la implementación?
Escribir los tests antes (metodología TDD) ayuda a tener claro qué tiene que hacer el código antes de ponerse a escribirlo a lo loco. Te obliga a pensar en los posibles fallos (como qué pasa si falta un dato) desde el principio. 

**Ejemplo de bug:** Si hago el registro de usuarios y escribo el test después, igual solo pruebo que "funciona cuando todo está bien". Si lo hago antes, escribiría un test para cuando el email ya existe; si no hubiera hecho ese test antes, se me podría haber olvidado programar esa validación y el sistema permitiría usuarios duplicados.

### 2. ¿Por qué usamos una base de datos de test separada en lugar de mockear el módulo db? ¿Cuándo sí tendría sentido mockear?
Usamos una base de datos real (`peliculas_test`) porque queremos estar seguros de que el SQL que hemos escrito funciona de verdad en PostgreSQL. Si usamos un "mock", estamos simulando la base de datos y no veríamos fallos reales como errores de sintaxis o problemas con las claves foráneas.

**Cuándo mockear:** Tendría sentido cuando el test no depende de la base de datos, o cuando usamos servicios externos que tardan mucho o que cobran por cada uso (como una pasarela de pagos o un servicio de envío de SMS).

### 3. ¿Qué es el error de PostgreSQL con código 23505 y por qué lo capturamos específicamente?
El código `23505` es el error de **"violación de restricción única"**. Salta cuando intentas insertar algo que ya existe en una columna que no permite duplicados (como el email de un usuario).

Lo capturamos para que el servidor no "explote" con un error 500 genérico. Al capturarlo, podemos enviarle al usuario un mensaje más amable, como un 400 avisándole de que ese email ya está pillado.
# Migration `20200915073602`

This migration has been generated by Donald Wu at 9/15/2020, 3:36:02 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200914143214..20200915073602
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model users {
   users_id   Int         @default(autoincrement()) @id
@@ -14,8 +14,9 @@
   email      String
   password   String
   created_by DateTime    @default(now())
   updated_by DateTime    @default(now())
+  posts      posts[]
   tech_blog  tech_blog[]
 }
 model tech_blog {
@@ -51,4 +52,15 @@
   phonecode  Int
   created_by DateTime @default(now())
   updated_by DateTime @default(now())
 }
+
+model posts {
+  posts_id    Int      @default(autoincrement()) @id
+  title       String
+  description String
+  tag         String
+  users_id    Int?
+  created_by  DateTime @default(now())
+  updated_by  DateTime @default(now())
+  users       users?   @relation(fields: [users_id], references: [users_id])
+}
```


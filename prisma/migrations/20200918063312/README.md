# Migration `20200918063312`

This migration has been generated by Donald Wu at 9/18/2020, 2:33:12 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."hackathons" (
"hackathons_id" SERIAL,
"image" text   NOT NULL ,
"name" text   NOT NULL ,
"mode" text   NOT NULL ,
"prize" text   NOT NULL ,
"details" text   NOT NULL ,
"created_by" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_by" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("hackathons_id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200918051650..20200918063312
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
   users_id         Int                @default(autoincrement()) @id
@@ -77,8 +77,9 @@
 }
 model hackathons {
   hackathons_id Int      @default(autoincrement()) @id
+  image         String
   name          String
   mode          String
   prize         String
   details       String
```


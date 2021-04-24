-- CreateTable
CREATE TABLE "users" (
    "users_id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("users_id")
);

-- CreateTable
CREATE TABLE "tech_blog" (
    "tech_blog_id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "tag" VARCHAR(255) NOT NULL,
    "users_id" INTEGER,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("tech_blog_id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "jobs_id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "company_url" TEXT NOT NULL,
    "department" VARCHAR(255) NOT NULL,
    "location" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("jobs_id")
);

-- CreateTable
CREATE TABLE "country" (
    "country_id" SERIAL NOT NULL,
    "iso" CHAR(2) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "nicename" VARCHAR(80) NOT NULL,
    "iso3" CHAR(3),
    "numcode" SMALLINT,
    "phonecode" INTEGER NOT NULL,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "posts" (
    "posts_id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "tag" VARCHAR(255) NOT NULL,
    "like_count" INTEGER DEFAULT 0,
    "users_id" INTEGER,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("posts_id")
);

-- CreateTable
CREATE TABLE "firebase_details" (
    "firebase_details_id" SERIAL NOT NULL,
    "current_token" TEXT NOT NULL,
    "refreshed_token" TEXT NOT NULL,
    "users_id" INTEGER,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("firebase_details_id")
);

-- CreateTable
CREATE TABLE "hackathons" (
    "hackathons_id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "mode" VARCHAR(255) NOT NULL,
    "prize" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "date_time" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("hackathons_id")
);

-- CreateTable
CREATE TABLE "invite_friends" (
    "invite_friends_id" SERIAL NOT NULL,
    "invite_link" TEXT NOT NULL,
    "generated_text" TEXT NOT NULL,
    "users_id" INTEGER,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("invite_friends_id")
);

-- CreateTable
CREATE TABLE "mock_interview_question" (
    "mock_interview_question_id" SERIAL NOT NULL,
    "question_title" TEXT NOT NULL,
    "question_description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("mock_interview_question_id")
);

-- CreateTable
CREATE TABLE "upcoming_interview" (
    "upcoming_interview_id" SERIAL NOT NULL,
    "full_date_time" TEXT NOT NULL,
    "date_time" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "mock_interview_question_id" INTEGER,
    "users_id" INTEGER,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("upcoming_interview_id")
);

-- CreateTable
CREATE TABLE "past_interview" (
    "past_interview_id" SERIAL NOT NULL,
    "full_date_time" TEXT NOT NULL,
    "date_time" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "mock_interview_question_id" INTEGER,
    "users_id" INTEGER,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("past_interview_id")
);

-- CreateTable
CREATE TABLE "tech_salary" (
    "tech_salary_id" SERIAL NOT NULL,
    "job_title" VARCHAR(255) NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "total_compensation" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("tech_salary_id")
);

-- CreateTable
CREATE TABLE "women_investor_community" (
    "women_investor_community_id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "investor_type" TEXT NOT NULL,
    "areas_of_investment" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("women_investor_community_id")
);

-- CreateTable
CREATE TABLE "comments" (
    "comments_id" SERIAL NOT NULL,
    "comments_text" TEXT NOT NULL,
    "posts_id" INTEGER,
    "users_id" INTEGER,
    "created_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("comments_id")
);

-- AddForeignKey
ALTER TABLE "tech_blog" ADD FOREIGN KEY ("users_id") REFERENCES "users"("users_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD FOREIGN KEY ("users_id") REFERENCES "users"("users_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "firebase_details" ADD FOREIGN KEY ("users_id") REFERENCES "users"("users_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invite_friends" ADD FOREIGN KEY ("users_id") REFERENCES "users"("users_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upcoming_interview" ADD FOREIGN KEY ("mock_interview_question_id") REFERENCES "mock_interview_question"("mock_interview_question_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upcoming_interview" ADD FOREIGN KEY ("users_id") REFERENCES "users"("users_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "past_interview" ADD FOREIGN KEY ("mock_interview_question_id") REFERENCES "mock_interview_question"("mock_interview_question_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "past_interview" ADD FOREIGN KEY ("users_id") REFERENCES "users"("users_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD FOREIGN KEY ("posts_id") REFERENCES "posts"("posts_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD FOREIGN KEY ("users_id") REFERENCES "users"("users_id") ON DELETE SET NULL ON UPDATE CASCADE;

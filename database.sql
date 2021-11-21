CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY,
	"task" varchar(100) NOT NULL,
	"notes" varchar(100),
	"mark_completed" varchar(1) NOT NULL,
	"time_completed" varchar(250)
);

INSERT INTO "tasks" ("task", "notes", "mark_completed", "time_completed")
VALUES ('Groceries', 'eggs, milk, butter', 'N', ''),
('Clean bathroom', '', 'N', ''),
('Meeting', 'w/ Matt 1:30PM', 'N', ''),
('Walk the dog', 'morning walk', 'N', ''),
('Lunch', 'w/ Kathy 12:15PM', 'N', ''),
('Laundry', '', 'N', ''),
('Pick up kids', 'football practice', 'N', '');
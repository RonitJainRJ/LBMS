
CREATE TABLE lbms.StudentDetails (
    id INT IDENTITY(1,1) PRIMARY KEY,
    seat_number int UNIQUE,
    name NVARCHAR(255) ,
	joining_date NVARCHAR(20) ,
    paid_upto NVARCHAR(20),
    student_shift NVARCHAR(20),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

truncate TABLE lbms.StudentDetails

select * from lbms.StudentDetails

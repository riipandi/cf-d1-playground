-- wrangler d1 execute ripandis --file=migrations/0001_demo.sql --local
-- wrangler d1 execute ripandis --command='SELECT * FROM Customers' --local
DROP TABLE IF EXISTS Customers;

CREATE TABLE Customers (
  CustomerID int,
  CompanyName text,
  ContactName text,
  PRIMARY KEY (`CustomerID`)
);

INSERT INTO Customers (CustomerID, CompanyName, ContactName)
  VALUES (1, "Alfreds Futterkiste", "Maria Anders"), (4, "Around the Horn", "Thomas Hardy"), (11, "Bs Beverages", "Victoria Ashworth");

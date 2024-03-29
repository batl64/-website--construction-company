CREATE TABLE message (
id INT NOT NULL AUTO_INCREMENT , 
text TEXT NOT NULL , 
userReceiverId INT NOT NULL ,
userAuthorId INT NOT NULL , 
projectId INT NULL , 
createDate DateTime NOT NULL , 
PRIMARY KEY (id),
FOREIGN KEY (userReceiverId) REFERENCES users(Id) ON DELETE CASCADE,
FOREIGN KEY (userAuthorId) REFERENCES users(Id) ON DELETE CASCADE,
FOREIGN KEY (projectId) REFERENCES project(ID) ON DELETE CASCADE
);
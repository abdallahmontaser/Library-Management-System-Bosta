 
                                    Schema Diagram

                                    
 
  +---------------+       +-----------------+       +------------------+
  |      Book     |       |    Borrowing    |       |     Borrower     |
  +---------------+       +-----------------+       +------------------+
  | id: Int       |       | id: Int         |       | id: Int          |
  | title: String |1     N| borrowedAt: Date|N     1| name: String     |
  | author: String|-------| returnedAt: Date|-------| email: String    |
  | ISBN: String  |       | dueDate: Date   |       | registeredAt:Date|
  | quantity: Int |       | status: Enum    |       +------------------+
  | shelf: String |       | bookId: Int     |
  +---------------+       | borrowerId: Int |
                          +-----------------+
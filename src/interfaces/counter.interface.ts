export interface ICounterResponse{
  id: number;          
  name: string;        
  currentQueue: number; 
  maxQueue: number;     
  queues: number;       
  isActive: boolean;     
}

// id           Int       @id @default(autoincrement())
//   name         String    @unique
//   currentQueue Int       @default(0)
//   mexQueue     Int       @default(99)
//   queues       Int
//   isActive     Boolean   @default(true)
//   createdAt    DateTime  @default(now())
//   updatedAt    DateTime  @updatedAt
//   deletedAt    DateTime?
//   Queue        Queue[]
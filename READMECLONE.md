- npm run seed

- While in repo directory: 

  for file in millis/*.json 
  do 
    mongoimport --jsonArray --numInsertionWorkers 4 --db restaurant  --collection abouts --file $file 
  done
- check db:
  show dbs;
  use restaurant
  db.abouts.count({}) 



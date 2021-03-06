# Course Parser and REST API
## Description
First part of this task:

Implement loading of course archive from `http://api.bestchange.ru/info.zip` and take data from file `bm_rates.dat`        
A file consists of a set of lines, like: `117;89;454;66.82258603;1;123638.43;0.2506;1`, where `first - ID of sent currency`, `second - received currency`, `fourth - sending rate`&& `fifth - receiving rate`                                            
Find the most favorable rate for each currency pair that is the exchange rate of the exchanger that comes first in every currency pair in [BestChange](https://www.bestchange.ru/bitcoin-to-zcash.html)                                                                                                                    
Accordingly, write all the favorable courses to the database

Second part:                                                                                              
                                                                                                                           
Write a REST API for getting all the profitable courses, so that realize two methods:                                     
-`GET/courses`- getting all the courses with filtering: sent currency and received currency.                              
-`GET/course/getPair/send_currency/recive_currency`- obviously                                                                 

For convenience, a minimum UI with forms are provided.

## Installation
- `git clone https://github.com/romanV7/Course_Parser.git`
- `cd Course_Parser && npm i`
- `npm run start`

# Notice:
- Wait until the loading finishes, unless you won't be able to work with API! (This process takes approximately 4 minutes).
- I used module cluster in order to divide the whole task between subprocesses to process faster.
- When loading finishes, you can use API to get data.
- Make sure that you have mongodb connected
- Open browser and press Ctrl + O and choose file index.html for convenience (minimum UI forms) or create new tab and enter url provided below

# API routes
## `/courses/getAllCourses`
Route for getting all the courses with filtering: sent currency and received currency.

Parameters:

- `no parameters here`

Response:                                                                                                           
- `status`: HTTP status code.                                                                                             
- `error`: 
  - is `not null` if `status: 404` is `{ message: "Pair not found try another one" }`
  - is `null` if `status: 200`, is `{ message: "Error message" }` otherwise;                            
- `data`: array of objects containing the following response fields with filters:
  - `possible filters`:
    - receivedId,
    - gottonId                                     
- `Output after filtering`:
   - `id`: course unique id,
   - `receivedId`: course unique receivedId,
   - `gottenId`: course unique gottonId,
   
## `/courses/getPair/send_currency/recive_currency`
Route to get, according to received params, the most favorable rate for each currency pair 

Parameters:

- `sent currency`
- `received currency`

Response:                                                                                                              
- `status` HTTP status code.                                                                                                 
- `error`: is `null` if `status: 200`, is `{ message: "Error message" }` otherwise;
- `data`: object containing the following response fields (each object has next unique values):
  - `_id`: course id, 
  - `receivedId`: course unique receivedId,
  - `gottenId`: course unique gottenId,
  - `companyId`: vendor id,
  - `currIn`: input currency,
  - `currOut`: output currency,
  - `stuff`: receivedId/gottonId,
  - `key`: metadata,
  - `key_`: metadata

import pool from "../db/dbConfig";

const queries = {
    findAll :  (table) => {
        return (
            pool.query({
              text : `SELECT * FROM ${table}`
            })
        );
    },

    findWithCondition :  (table, condition,  num="*" , orderBy = "id", order = "ASC" ) => {
        return (
            pool.query({
              text : `SELECT ${num} FROM ${table} WHERE ${condition} ORDER BY ${orderBy} ${order}`
            })
        );
    },
    make : (action, table, input, placeholder, values) => {
        if(action === "update"){
            return (
                pool.query({
                    text: `UPDATE ${table} SET ${input} WHERE ${placeholder}`,
                    values: values
                })
           )
        } 
        
        else{
            return(  pool.query({
                text: `INSERT INTO ${table}(${input})  VALUES(${placeholder}) RETURNING *`,
                values : values
                
            })
        )
      }
    }
}


export default queries;
import pool from "../db/dbConfig";

const queries = {
    findAll :  (table, orderBy = "id ASC") => {
        return (
            pool.query({
              text : `SELECT * FROM ${table} ORDER BY ${orderBy}`
            })
        );
    },

    findWithCondition :  (table, condition, orderBy = "id ASC", num="*") => {
        console.log(condition)
        return (
            pool.query({
              text : `SELECT ${num} FROM ${table} WHERE ${condition} ORDER BY ${orderBy}`
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
    },
    deleteOne :  (table, condition, values) => {
        return (
            pool.query({
              text : `DELETE FROM ${table} WHERE ${condition}`,
              values: values
            })
        );
    }
}


export default queries;
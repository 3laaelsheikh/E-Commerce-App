import axios from "axios";
import { createContext, useEffect, useState } from "react"




export const WishlistContext = createContext();
 


export function WishlistContextProvider( {children} ){

    const [wishProducts, setWishProducts] = useState(null);
    const [numOfWishItems, setNumOfWishItems] = useState(0);
   
    
    
    async function addProductToWish( productId ){
        
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
                "productId": productId 
            }
            ,
            {
                headers: { token: localStorage.getItem("tkn") }
            });
            

            getUserWish();
            



            return data; 
        
        
        } 
        catch (err) {
            console.log("error",err);
        }

    }


    async function getUserWish(){
        try {
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers:{token: localStorage.getItem("tkn")}
            });

            

           

            setWishProducts(data.data);
            setNumOfWishItems(data.numOfCartItems);
            
            return data;


        }
        catch (err) {
            console.log("error",err); 
        }
    }

    

    async function deleteProduct(productId){

        try {
           
           const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers:{token: localStorage.getItem("tkn")}
           }); 

           getUserWish();

            // setWishProducts(data.data);
            // setNumOfWishItems(data.numOfCartItems);

            return data;


        } catch (error) {
           console.log("error" ,error); 
        }
    }

   



    useEffect(function () {
        getUserWish();
    }, []);







    // async function addProductToWishList( productId ){
        
    //     try {
    //         const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
    //             "productId": productId 
    //         }
    //         ,
    //         {
    //             headers: { token: localStorage.getItem("tkn") }
    //         });
            
    //         console.log(data);
            
    //         getUserWishList();
            



    //         return data; 
        
        
    //     } 
    //     catch (err) {
    //         console.log("error",err);
    //     }



    //      async function getUserWishList(){
    //         try {
    //             const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
    //             headers:{token: localStorage.getItem("tkn")}
    //             });
    //             console.log(data.data);
    
    //             setWishlistProducts(data.data);
                
    
    //             return data;
    
    
    //         }
    //         catch (err) {
    //             console.log("error",err); 
    //         }
    //     }


        

       
    
        




    //     useEffect(function () {
    //         getUserWishList();
    //     }, []);

    // }
    // value={ { setWishlistProducts , addProductToWishList ,  wishlistProducts  } }


    return <WishlistContext.Provider  value={ { getUserWish , addProductToWish , wishProducts , numOfWishItems , deleteProduct  } }>
    
    
    {children}    
    
    </WishlistContext.Provider>


}
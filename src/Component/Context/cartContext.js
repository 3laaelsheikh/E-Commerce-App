import axios from "axios";
import { createContext, useEffect, useState } from "react"



export const CartContext = createContext();





export function CartContextProvider( {children} ){

    const [cartProducts, setCartProducts] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState("");
    
    
    async function addProductToCart( productId ){
        
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
                "productId": productId 
            }
            ,
            {
                headers: { token: localStorage.getItem("tkn") }
            });
            

            getUserCart();
            // setCartProducts(data.data.products);
            // setTotalCartPrice(data.data.totalCartPrice);
            // setNumOfCartItems(data.numOfCartItems);



            return data; 
        
        
        } 
        catch (err) {
            console.log("error",err);
        }

    }


    async function getUserCart(){
        try {
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{token: localStorage.getItem("tkn")}
            });

            
           

            setCartProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setNumOfCartItems(data.numOfCartItems)
            setCartId(data.data._id)

            return data;


        }
        catch (err) {
            console.log("error",err); 
        }
    }

    async function deleteCartData(){
        try {
            const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{token: localStorage.getItem("tkn")}
            });

            setCartProducts([]);
            setTotalCartPrice(0);
            setNumOfCartItems(0);

            return data;


        }
        catch (err) {
            console.log("error",err); 
        }
    }

    async function deleteProduct(productId){

        try {
           
           const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers:{token: localStorage.getItem("tkn")}
           }); 

            setCartProducts(data.data.products);
            setTotalCartPrice(data.data.totalCartPrice);
            setNumOfCartItems(data.numOfCartItems);

            return data;


        } catch (error) {
           console.log("error" ,error); 
        }
    }

    async function updateCount(productId , count){
        try {
            const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
                "count": count
            },{
                headers:{token: localStorage.getItem("tkn")}    
            });
            
            setCartProducts(data.data.products);
            setTotalCartPrice(data.data.totalCartPrice);
            setNumOfCartItems(data.numOfCartItems);

            return data;
            

        } catch (error) {
            console.log("error" ,error); 
        }
    }



    useEffect(function () {
        getUserCart();
    }, []);


    return <CartContext.Provider  value={ { getUserCart , addProductToCart , cartProducts , totalCartPrice , numOfCartItems , deleteProduct , updateCount , deleteCartData , cartId } }>
    
    
    {children}    
    
    </CartContext.Provider>


}
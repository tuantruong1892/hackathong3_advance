import { log } from "console";
import { ProductList, Product } from "../data";
import "./cart.css";
import React from "react";
interface CartProps {
  cartElement: Product[];
  onClick: () => void;
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
}

function Cart({ cartElement, onClick, setProduct }: CartProps) {
  const totalAmount = cartElement.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const clearCart = () => {
    setProduct([]);
  };

  return (
    <div id="page-cart">
      <div className="container">
        <table id="cart">
          <thead>
            <tr>
              <th className="img">Ảnh</th>
              <th className="name">Tên</th>
              <th className="quantity">Số lượng</th>
              <th className="prince">Giá</th>
              <th className="action">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {cartElement.map((product) => (
              <tr className="productitm" key={product.name}>
                <td>
                  <img src={product.imgUrl} className="thumb" />
                </td>
                <td>
                  <p>{product.name}</p>
                </td>
                <td>
                  <div className="td-qyt">
                    <button
                      onClick={() => {
                        const updatedCart = cartElement.map((item) => {
                          if (item === product && item.qty > 1) {
                            return { ...item, qty: item.qty - 1 };
                          }
                          return item;
                        });
                        setProduct(updatedCart);
                      }}
                    >
                      -
                    </button>
                    <span>{product.qty}</span>
                    <button
                      onClick={() => {
                        const updatedCart = cartElement.map((item) => {
                          if (item === product) {
                            return { ...item, qty: item.qty + 1 };
                          }
                          return item;
                        });
                        setProduct(updatedCart);
                      }}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${(product.price * product.qty)}</td>
                <td>
                  <button
                    onClick={() => {
                      const updatedCart = cartElement.filter(
                        (item) => item !== product
                      );
                      setProduct(updatedCart);
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            <tr className="totalprice">
              <td colSpan={3}>&nbsp;</td>
              <td colSpan={2}>
                <div className="td-total-price">
                  <p>Tổng giá tiền</p>
                  <span className="thick">${totalAmount}</span>
                </div>
              </td>
            </tr>
            <tr className="checkoutrow">
              <td colSpan={5}>
                <div className="checkout">
                  <button
                    id="submitbtn"
                    onClick={() => {                 
                      if ((cartElement.length == 0)) {
                        alert("không có sản phẩm");
                      } else {
                        alert("cảm ơn khách hàng đã mua hàng");
                        clearCart();
                      }
                    }}
                  >
                    Thanh toán
                  </button>
                  <button id="submitbtn" onClick={clearCart}>
                    xóa hết
                  </button>
                  <button id="submitbtn" onClick={onClick}>
                    đóng{" "}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cart;

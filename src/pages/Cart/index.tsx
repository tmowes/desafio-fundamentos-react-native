/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { View } from 'react-native';
import FloatingCart from '../../components/FloatingCart';

import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubtotalValue,
} from './styles';

import { useCart } from '../../hooks/cart';

import formatValue from '../../utils/formatValue';

interface CartState {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const { increment, decrement, products } = useCart();

  function handleIncrement(id: string): void {
    // DONE CALL HOOK USECART INCREMENT
    increment(id);
  }

  function handleDecrement(id: string): void {
    // DONE CALL HOOK USECART DECREMENT
    decrement(id);
  }

  const cartTotal = useMemo(() => {
    // DONE RETURN THE SUM OF THE PRICE FROM ALL ITEMS IN THE CART
    const total = products.reduce((acc, product) => {
      const subtotal = product.quantity * product.price;
      return acc + subtotal;
    }, 0);
    return formatValue(total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    // DONE RETURN THE SUM OF THE QUANTITY OF THE PRODUCTS IN THE CART
    const quantity = products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
    return quantity;
  }, [products]);

  return (
    <Container>
      <ProductContainer>
        <ProductList<any>
          data={products}
          keyExtractor={(item: { id: string }) => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }: { item: CartState }) => (
            <Product>
              <ProductImage source={{ uri: item.image_url }} />
              <ProductTitleContainer>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPriceContainer>
                  <ProductSinglePrice>
                    {formatValue(item.price)}
                  </ProductSinglePrice>

                  <TotalContainer>
                    <ProductQuantity>{`${item.quantity}x`}</ProductQuantity>

                    <ProductPrice>
                      {formatValue(item.price * item.quantity)}
                    </ProductPrice>
                  </TotalContainer>
                </ProductPriceContainer>
              </ProductTitleContainer>
              <ActionContainer>
                <ActionButton
                  testID={`increment-${item.id}`}
                  onPress={() => handleIncrement(item.id)}
                >
                  <FeatherIcon name="plus" color="#E83F5B" size={16} />
                </ActionButton>
                <ActionButton
                  testID={`decrement-${item.id}`}
                  onPress={() => handleDecrement(item.id)}
                >
                  <FeatherIcon name="minus" color="#E83F5B" size={16} />
                </ActionButton>
              </ActionContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <TotalProductsContainer>
        <FeatherIcon name="shopping-cart" color="#fff" size={24} />
        <TotalProductsText>{`${totalItensInCart} itens`}</TotalProductsText>
        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>
      {/* <FloatingCart /> */}
    </Container>
  );
};

export default Cart;

import { Overlay, ModalBody, OrderDetails, Actions } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import { useEffect } from 'react';

interface OrderModalProps {
    visible: boolean;
    order: Order | null;
    onClose: () => void;
}

export function OrderModal({visible, order, onClose} : OrderModalProps){

  useEffect(() => {
    function handleKeyDown(event : KeyboardEvent){
      if (event.key === 'Escape'){
        onClose();
      }}
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if(!visible || !order) {
    return null;
  }

  const total = order.products.reduce((acc, {product, quantity}) => {
    return acc + (product.price * quantity);
  }, 0);


  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button
            type="button"
            onClick={onClose}
          >
            <img src={closeIcon} alt="Ícone de fechamento"></img>
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido:</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕗'}
              {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>

            <strong>
              {order.status === 'WAITING' && 'Fila de Espera'}
              {order.status === 'IN_PRODUCTION' && '👨Em preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({_id, product, quantity}) => (
              <div className="item" key={_id}>
                <img
                  src={'path'}
                  alt={''}
                  width="56"
                  height="28.51"
                />

                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>

          <Actions>
            <button type='button' className='primary'>
              <span>👨‍🍳</span>
              <strong>Iniciar Produção</strong>
            </button>

            <button type='button' className='secondary'>
              <strong>Cancelar pedido</strong>
            </button>
          </Actions>
        </OrderDetails>
      </ModalBody>
    </Overlay>
  );
}

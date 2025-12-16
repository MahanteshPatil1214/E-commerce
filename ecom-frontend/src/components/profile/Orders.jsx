import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getUserOrders } from '../../store/actions';
import Paginations from '../shared/Paginations';

const backendBase = import.meta.env.VITE_BACK_END_URL || '';

function getImageSrc(img) {
  if (!img) return '';
  // if already absolute or data-uri, return as-is
  if (img.startsWith('http') || img.startsWith('data:')) return img;
  // otherwise prefix with backend base and normalize slashes
  const base = backendBase.replace(/\/$/, '');
  const path = img.replace(/^\//, '');
  return base ? `${base}/${path}` : `/${path}`;
}

const cardStyle = {
  border: '1px solid #e6e6e6',
  borderRadius: 8,
  padding: 16,
  marginBottom: 16,
  background: '#fff',
  maxWidth: 920,
  marginLeft: 'auto',
  marginRight: 'auto',
};

const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 };
const itemRow = { display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f4f4f4' };
const thumbStyle = { width: 64, height: 64, objectFit: 'cover', borderRadius: 6, background: '#fafafa', border: '1px solid #eee' };

const Orders = () => {
  const dispatch = useDispatch();
  const { userOrders, pagination } = useSelector((state) => state.order);
  const [searchParams] = useSearchParams();
  const paramPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const pageIndex = Math.max(0, paramPage - 1);

  useEffect(() => {
    const qs = `pageNumber=${pageIndex}&pageSize=6`;
    dispatch(getUserOrders(qs));
  }, [dispatch, pageIndex]);

  if (!userOrders) return <div style={{ padding: 24, textAlign: 'center' }}>Loading orders...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 18 }}>My Orders</h2>

      {userOrders.length === 0 ? (
        <div style={{ textAlign: 'center' }}>You have no orders yet.</div>
      ) : (
        userOrders.map((order) => (
          <div key={order.orderId} style={cardStyle}>
            <div style={headerStyle}>
              <div>
                <div style={{ fontWeight: 700 }}>Order #{order.orderId}</div>
                <div style={{ color: '#666', fontSize: 13 }}>{order.orderDate}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700 }}>${order.totalAmount?.toFixed?.(2) ?? order.totalAmount}</div>
                <div style={{ marginTop: 6 }}><strong>Status:</strong> <span style={{ color: '#2b7a0b' }}>{order.orderStatus}</span></div>
              </div>
            </div>

            <div>
              {order.orderItems && order.orderItems.length > 0 ? (
                order.orderItems.map((it) => (
                  <div key={it.oderItemId || `${order.orderId}-${it.product?.productId}`} style={itemRow}>
                    <div style={{ width: 64 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{it.product?.productName || 'Product'}</div>
                      <div style={{ color: '#666', fontSize: 13 }}>Qty: {it.quantity} • Price: ${it.orderedProductPrice?.toFixed?.(2) ?? it.orderedProductPrice}</div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: 80 }}>${(it.orderedProductPrice * it.quantity)?.toFixed?.(2) ?? (it.orderedProductPrice * it.quantity)}</div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#666' }}>No items in this order.</div>
              )}
            </div>
          </div>
        ))
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
        <Paginations numberOfPage={pagination?.totalPages ?? 1} totalProducts={pagination?.totalElements ?? 0} />
      </div>
    </div>
  );
};

export default Orders;

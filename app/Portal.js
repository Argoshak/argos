'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
export default function Portal({ children }) { const [m, setM] = useState(false); useEffect(() => setM(true), []); return m ? createPortal(children, document.body) : null; }

"use client"
import dynamic from 'next/dynamic';
import { poc } from "@/lib/poc";
import { Module } from './module-component';

const POC = Module(poc, 'smart40_g4/Traceability');

export default POC;
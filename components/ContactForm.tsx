"use client";
import { FormEvent, useState } from "react";
export default function ContactForm(){const [sent,setSent]=useState(false);const submit=(e:FormEvent)=>{e.preventDefault();setSent(true)};return <form onSubmit={submit} className="grid gap-3">
 <input required name="name" placeholder="Your name" className="rounded-lg border border-[#23262f] bg-[#08090c] p-4 text-white outline-none focus:border-[#b7ff3c]"/>
 <input required type="email" name="email" placeholder="Email address" className="rounded-lg border border-[#23262f] bg-[#08090c] p-4 text-white outline-none focus:border-[#b7ff3c]"/>
 <select name="service" className="rounded-lg border border-[#23262f] bg-[#08090c] p-4 text-white outline-none focus:border-[#b7ff3c]"><option>Web / Software</option><option>Branding / Design</option><option>Marketing</option><option>Printing / Merchandise</option><option>Full-service package</option></select>
 <textarea required name="message" rows={5} placeholder="Tell us about your project..." className="resize-y rounded-lg border border-[#23262f] bg-[#08090c] p-4 text-white outline-none focus:border-[#b7ff3c]"/>
 <button className="rounded-lg bg-[#b7ff3c] px-6 py-4 font-bold text-[#0a0c08]">Send Project Brief ↗</button>
 {sent&&<p className="text-sm text-[#b7ff3c]">Thanks! Your brief was captured. Connect this form to an email/CRM API for production submissions.</p>}
 </form>}

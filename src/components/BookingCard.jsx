'use client'
import { authClient } from '@/lib/auth-client';
import { DateField } from '@heroui/react';
import { json } from 'better-auth';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const BookingCard = ({destination}) => {

    const { price,imageUrl,duration,destinationName,description,country }= destination
    // console.log(destination,'ds');

     const { data: session } = authClient.useSession();
      const user = session?.user;
      // console.log(user, "user");

    const [departureDate,setDepartureDate]= useState(null)
    console.log( new Date( departureDate),'departure');
   
    const handleBooking = async()=> {
        const BookingData = {
            userId: user._id,
            userName:user.name,
            userImage:user.image,
            price,
            country,
            imageUrl,
            destinationName,
            duration,
            departure: new Date(departureDate)



        }
      
        const res = await fetch('http://localhost:5000/bookign',{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify(BookingData)
        })
        const data = await res.json();
        toast.success("You Booking Success")
        
    }

    return (
        <div>
                 {/* ================= RIGHT BOOKING CARD ================= */}
                      <div className="border-l border-gray-200 p-5">
                        <p className="text-xs text-gray-500">Starting from</p>
            
                        <h2 className="text-2xl font-bold text-cyan-500">${price}</h2>
            
                        <p className="text-[10px] text-gray-400">per person</p>
            
                        {/* Date */}
                        <div className="mt-5 border border-gray-100 bg-gray-50 p-3">
                          <p className="text-[10px] text-gray-500">Departure Date</p>
            
                          <DateField onChange={setDepartureDate} className="w-[256px]" name="date">
                            
                            <DateField.Group>
                              <DateField.Input>
                                {(segment) => <DateField.Segment segment={segment} />}
                              </DateField.Input>
                            </DateField.Group>
                          </DateField>
                        </div>
            
                        {/* Book Button */}
                        <button onClick={handleBooking} className="mt-4 w-full bg-cyan-500 py-3 text-xs font-medium text-white hover:bg-cyan-600">
                          Book Now →
                        </button>
            
                        {/* Features */}
                        <div className="mt-4 space-y-2">
                          <p className="flex items-center gap-2 text-[10px] text-gray-500">
                            <FaCheck className="text-green-500" />
                            Free cancellation up to 7 days
                          </p>
            
                          <p className="flex items-center gap-2 text-[10px] text-gray-500">
                            <FaCheck className="text-green-500" />
                            Travel insurance included
                          </p>
            
                          <p className="flex items-center gap-2 text-[10px] text-gray-500">
                            <FaCheck className="text-green-500" />
                            24/7 customer support
                          </p>
                        </div>
                      </div>
        </div>
    );
};

export default BookingCard;
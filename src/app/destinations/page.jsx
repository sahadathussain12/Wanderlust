import DestinationCard from "@/components/DestinationCard";


const DestinationPage = async() => {
   const res = await fetch('http://localhost:5000/destinations');
   const destinations = await res.json();
   console.log(destinations);

    return (
        <div>
            <h1 className="text-3xl font-bold p-5"> All destination</h1> 

            <div className="grid grid-cols-3 gap-4 object-cover max-w-7xl mx-auto mt-5">
                {
                    destinations.map ( destination => <DestinationCard key={destination._id} destination={destination} />)
                }
            </div>
        </div>
    );
};

export default DestinationPage;
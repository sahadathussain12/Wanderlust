

const DestinationPage = async() => {
   const res = await fetch('http://localhost:5000/destinations');
   const destinations = await res.json();
   console.log(destinations);

    return (
        <div>
            All destination 

            <div>
                {
                    destinations.map ( destination => <div key={destination._id }>
                        {destination.destinationName}</div>)
                }
            </div>
        </div>
    );
};

export default DestinationPage;
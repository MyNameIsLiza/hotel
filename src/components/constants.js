import defaultImage from "../images/defaultImage.png";

export const defaultRoom = {
    roomNumber: 0,
    image: defaultImage,
    description: ''
};

export const formatDate = (date) => (new Date(date)).toISOString().split("T")[0];

export const defaultOrder = () => {
    return {
        dateOfArrival: new Date(),
        dateOfDeparture:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2)
    }
};



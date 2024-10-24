import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon

const users = [
    {
      name: "Darshika Nemani",
      title: "Doctor",
      imageUrl: "https://bmf-profiles.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2024-10-24+at+1.30.16+AM.jpeg",
      status: "Available for consultations",
      joinedOn: "Jan 15, 2023",
      whatsapp: "https://wa.me/7220051659",
      description: "Dr. Darshika Nemani is a compassionate mental health expert with a focus on holistic healing. With extensive experience in therapy and counseling, she is dedicated to empowering individuals to achieve emotional well-being and resilience."
    },
    {
      name: "Anuska Kushwaha",
      title: "Doctor",
      imageUrl: "https://bmf-profiles.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2024-10-24+at+1.31.46+AM.jpeg",
      status: "Available for consultations",
      joinedOn: "Feb 20, 2023",
      whatsapp: "https://wa.me/8955518938",
      description: "Dr. Anuska Kushwaha specializes in mental health and wellness, providing tailored therapeutic approaches to suit individual needs. Her empathetic nature and professional expertise make her a trusted partner in navigating life's challenges."
    }
  ];
  

const UserProfileCards = () => {
  return (
    <div className="flex flex-row items-center">
      {users.map((user, index) => (
        <div key={index} className="m-10 max-w-sm">
          <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
            <div className="relative mx-auto w-36 rounded-full">
              <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
              <img className="mx-auto h-auto w-full rounded-full" src={user.imageUrl} alt={user.name} />
            </div>
            <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">{user.name}</h1>
            <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">{user.title}</h3>
            <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">{user.description}</p>
            <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
              <li className="flex items-center py-3 text-sm">
                <span>Status</span>
                <span className="ml-auto"><span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">{user.status}</span></span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Joined On</span>
                <span className="ml-auto">{user.joinedOn}</span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <a href={user.whatsapp} target="_blank" rel="noopener noreferrer" className="ml-auto text-green-500 hover:text-green-700">
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProfileCards;

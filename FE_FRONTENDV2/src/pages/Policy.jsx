import React from 'react';
import Base from '../layouts/base';

const Policy = () => {
    return (
        <Base>
            <div className="max-w-2xl mx-auto mt-10 p-4">
                <h1 className="text-4xl font-bold mb-6">Personal Leave Policy</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Personal Leave Policy (Additional)</h2>
                    <p className="text-gray-700">
                        The Company will allow employees to take personal leave 3 days per year for the following criteria with getting paid and evident document:
                    </p>
                    <br />
                    <p className="text-gray-700">
                        1) Funeral, for the deaths of their father, mother, spouse, siblings, and legitimate child.<br />
                        2) Emergency or accident, of their father, mother, spouse, siblings, and legitimate child.<br />
                        3) Marriage, own self on the marriage date.<br />
                        4) District office/government office, own self ID/ driving/passport/visa license etc.<br />
                        5) Graduation ceremony, own self on commencement day.<br />
                        6) Natural disaster/robbery, in case of natural disasters or robbery for own self.<br />
                        7) Covid-19 Vaccination, on the appointment date<br />
                        8) Paternity leave<br /><br />
                        The others are not in list will be used as annual leave.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Chat Bot Policy</h2>
                    <p className="text-gray-700">
                        This policy outlines guidelines for the respectful use of our chat bot application. Users must engage in lawful and respectful conduct, refraining from harassment, discrimination, offensive language, or unauthorized attempts to manipulate the application. Data privacy is a priority, and user information will only be collected for the application's intended purpose, adhering to our Privacy Policy.
                        <br /><br />
                        Intellectual property rights are owned by the application provider, and users must not reproduce or distribute content without authorization. Users are responsible for the accuracy of information inputted. Reporting violations is encouraged through designated channels.
                        <br /><br />
                        The provider reserves the right to update the application and policies, with users notified of significant changes. Termination of access is possible for policy violators. The provider disclaims liability for damages resulting from the application's use. Users agree to these terms by utilizing the chat bot application.
                    </p>
                </section>


            </div>
        </Base>
    );
};

export default Policy;

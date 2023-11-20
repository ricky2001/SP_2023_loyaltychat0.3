// Policy.jsx

import React from 'react';
import Base from '../layouts/base';

const Policy = () => {
    return (
        <Base>
            <div className="max-w-2xl mx-auto mt-10 p-4">
                <h1 className="text-4xl font-bold mb-6">Company Policies</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
                    <p className="text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget
                        turpis euismod, vehicula justo a, ultricies orci.
                        {/* Add your privacy policy content here */}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
                    <p className="text-gray-700">
                        Curabitur tincidunt, mauris a venenatis fringilla, justo dolor
                        facilisis elit, a consectetur elit turpis eu nunc.
                        {/* Add your terms of service content here */}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
                    <p className="text-gray-700">
                        Vestibulum fermentum augue non turpis tincidunt, ut consectetur nunc
                        efficitur. Integer et metus vel mauris fermentum fringilla.
                        {/* Add your refund policy content here */}
                    </p>
                </section>

                {/* Add more sections for other policies as needed */}

            </div>
        </Base>
    );
};

export default Policy;

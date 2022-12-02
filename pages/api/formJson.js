const formFields = {
    fields: [
        {
            placeholder: 'First Name',
            name: 'firstName',
            type: 'text',
            required: true,
            message: 'Input your firstname'
        },
        {
            placeholder: 'Last Name',
            name: 'lastName',
            type: 'text',
            required: false,
        },
        {
            placeholder: 'Address',
            name: 'address',
            type: 'text',
            required: false,
        },
        {
            placeholder: 'Email',
            name: 'email',
            type: 'email',
            required: true,
            message: 'Input your email'
        },
        {
            placeholder: 'Country',
            name: 'country',
            type: 'select',
            required: true,
            message: 'Select your country',
            options: [
                {
                    key: 0,
                    value: 'India'
                },
                {
                    key: 1,
                    value: 'Sri Lanka'
                },
                {
                    key: 2,
                    value: 'USA'
                },
                {
                    key: 3,
                    value: 'England'
                },
                {
                    key: 4,
                    value: 'Singapore'
                },
                {
                    key: 5,
                    value: 'Japan'
                }
            ]
        },
        {
            placeholder: 'Description',
            name: 'description',
            type: 'textarea',
            required: false
        },
        {
            placeholder: 'State',
            name: 'state',
            type: 'text',
            required: false
        },
        {
            placeholder: 'Street',
            name: 'state',
            type: 'text',
            required: false
        },

    ],
   
    
}

export default function getFormFields(req, res) {
    res.status(200).json(formFields)
}
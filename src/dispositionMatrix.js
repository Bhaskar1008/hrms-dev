let dispositionMatrix = {
	leadStatus: [
		{
			text: "New Lead Entry",
			value: "newleadentery",
			config: {
				dispositions: false,
				subdisosition: false,
				dateTime: false
			}
		},
		{
			text: "NO Contact",
			value: "nocontact",
			config: {
				dispositions: true,
				subdisosition: true,
				dateTime: false
			}
		},
		{
			text: "Contact",
			value: "contact",
            config: {
				dispositions: true,
				subdisosition: true,
				dateTime: true
			}
		}
	],
	leadDisositions: {
		"status": "contact",
		"dispositions": [
			{
				text: "Appointment",
				value: "appointmet"
			},
            {
				text: "Callback",
				value: "callback"
			},
            {
				text: "Short hang up",
				value: "appointmet"
			},
            {
				text: "Not Interested",
				value: "notinterested"
			},
            {
				text: "Not Servicable location",
				value: "notservicablelocation"
			},
            {
				text: "Not Eligible",
				value: "noteligible"
			},
        ]
    }
}
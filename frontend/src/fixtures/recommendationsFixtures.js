const recommendationsFixtures = {
    oneRecommendation: {
        "id": 1,
        "requesterEmail": "shialan@ucsb.edu",
        "professorEmail": "phtcon@ucsb.edu",
        "explanation": "BS/MS Program",
        "dateRequested": "2022-01-02T12:00:00",
        "dateNeeded": "2022-11-02T12:00:00",
        "done": false
    },
    threeRecommendations: [
        {
            "id": 1,
            "requesterEmail": "shialan@ucsb.edu",
            "professorEmail": "phtcon@ucsb.edu",
            "explanation": "BS/MS Program",
            "dateRequested": "2022-01-02T12:00:00",
            "dateNeeded": "2022-11-02T12:00:00",
            "done": false
        },
        {
            "id": 2,
            "requesterEmail": "gaucho@ucsb.edu",
            "professorEmail": "professor@ucsb.edu",
            "explanation": "PhD Program",
            "dateRequested": "2022-02-02T12:00:00",
            "dateNeeded": "2022-12-02T12:00:00",
            "done": true
        },
        {
            "id": 3,
            "requesterEmail": "shialanyu@ucsb.edu",
            "professorEmail": "professor2@ucsb.edu",
            "explanation": "Another PhD Program",
            "dateRequested": "2022-03-02T12:00:00",
            "dateNeeded": "2022-12-03T12:00:00",
            "done": false
        }
    ]
};


export { recommendationsFixtures };
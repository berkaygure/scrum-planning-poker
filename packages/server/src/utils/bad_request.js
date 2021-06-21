function bad_request(res, msg) {
    res.statusCode = 400;
    res.json({
        errorDetails: msg || "Invalid Data"
    })

    return res;
}
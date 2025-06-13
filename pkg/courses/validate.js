const courseCreate = {
title: "required|string",
description: "required|string",
academy: "required|string"
}

const courseUpdate = {
title: String,
description: String
}

module.exports ={
    courseCreate,
    courseUpdate
}
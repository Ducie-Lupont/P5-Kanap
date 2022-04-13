let params = new URL(document.location).searchParams
let orderId = params.get("order")
document.querySelector("#orderId").innerHTML = "<br/>"+"<br/>"+orderId
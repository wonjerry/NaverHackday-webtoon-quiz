<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="container-wrapper">
	<div class="container">
		<h2>퀴즈</h2>
		<p>라운드</p>
		<table class="table table-striped">
			<thead>
				<tr class="bg-success">
					<th>Photo Thumb</th>
					<th>Name</th>
					<th>Category</th>
					<th>Price</th>
					<th>Manufacturer</th>
					<th>UnitInStock</th>
					<th>Description</th>
					<th>Info</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach var="product" items="${products }">
					<tr>
						<td><img
							src="<c:url value="/resources/images/${product.imageName}" />"
							alt="image" style="width: 100%" /></td>
						<td>${product.name }</td>
						<td>${product.category}</td>
						<td>${product.price}</td>
						<td>${product.manufacturer}</td>
						<td>${product.unitInStock}</td>
						<td>${product.description}</td>
						<td><a href="<c:url value="/viewProduct/${product.id}" />">
								<i class="fa fa-info-circle"></i>
						</a></td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>
</div>
    <!--<div class="row text-center"><strong> User Details</strong></div>
    <div class="row" style="border:1px solid green;padding:10px">
        <div class="col-md-4 text-center"><strong>Name</strong></div>
        <div class="col-md-4 text-center"><strong>Email</strong></div>
        <div class="col-md-4 text-center"><strong>Address</strong></div>
    </div>
        <c:forEach var="user" items="${users}">
            <div class="row" style="border:1px solid green;padding:10px">
            <div class="col-md-4 text-center">${user.name}</div>
            <div class="col-md-4 text-center" >${user.email}</div>
                <div class="col-md-4 text-center">${user.address}</div>
            </div>
        </c:forEach>-->
<script>
const userAction = async () => {
  
const response = await fetch('http://localhost:8080/api/quizs');
  
const myJson = await response.json(); //extract JSON from the http response
  
  console.log(myJson);
// do something with myJson

}

userAction();

var httpRequest;

function createRequest() {

    if (window.XMLHttpRequest) { 

        return new XMLHttpRequest();

    } else {        

        return new ActiveXObject("Microsoft.XMLHTTP");

    }

}

var httpRequest = new XMLHttpRequest();

httpRequest.open("DELETE", "http://localhost:8080/api/quizs/1", true);

httpRequest.send("");
</script>
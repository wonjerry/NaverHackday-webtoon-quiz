<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div class="container-wrapper">
	<div class="container" style="margin:100px">
		<h2>Quiz List</h2>
		<br />
		<p>Round ${roundId }</p>
		<table class="table table-striped">
			<thead>
				<tr class="bg-success">
					<th>문제 사진</th>
					<th>번호</th>
					<th>주제</th>
					<th>문제 설명</th>
					<th>문제 종류</th>
					<th>정보</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach var="quiz" items="${quizs }">
					<tr>
						<td><img
							src="<c:url value="/ui/static/images/${quiz.imageName}" />"
							alt="image" style="width: 100px" /></td>
						<td>${quiz.num }</td>
						<td>${quiz.title}</td>
						<td>${quiz.description}</td>
						<td>${quiz.type}</td>					
						<td><a href="<c:url value="/admin/viewQuiz/${quiz.id}" />">
								<i class="fa fa-info-circle"></i>
						</a></td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		<div class="row" style="padding:10px">
        <div class="col-md-8 text-center"></div>
        <div class="col-md-2 text-center"><a href="<c:url value="/admin/addOptionQuiz/${roundId }" />"
        		class="btn btn-info">Option 문제 추가     </a></div>
        <div class="col-md-2 text-center"><a href="<c:url value="/admin/addOxQuiz/${roundId }" />"
						class="btn btn-info">OX 문제 추가</a></div>
    </div>
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

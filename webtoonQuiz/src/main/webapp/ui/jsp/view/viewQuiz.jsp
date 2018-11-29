<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="container-wrapper">
	<div class="container" style="margin:100px">
		<h2>퀴즈 상세</h2>
		<p class="lead">${quiz.roundId }회차 ${quiz.num }번 문제 ( ${quiz.type }형
			문제 )</p>
		<div class="row">
			<div class="col-md-6">
				<p>
					<strong>문제 ${quiz.num }.</strong> ${quiz.description }
				</p>
				<c:choose>
					<c:when test="${quiz.type eq 'option'}">

						<p>
							<strong>1. </strong> ${quiz.optionOne }
						</p>
						<p>
							<strong>2. </strong> ${quiz.optionTwo }
						</p>
						<p>
							<strong>3. </strong> ${quiz.optionThree }
						</p>
						<p>
							<strong>4. </strong> ${quiz.optionFour }
						</p>
						<p>
							<strong>정답 : </strong> ${quiz.solution }
						</p>
						<br />
					</c:when>
					<c:when test="${quiz.type eq 'ox'}">
    					<p>
							<strong>1. </strong> O
						</p>
						<p>
							<strong>2. </strong> X
						</p>
						
						<p>
							<strong>정답 : </strong> 
								<c:if test="${quiz.solution eq 1 }">O</c:if>
							 	<c:if test="${quiz.solution eq 0 }">X</c:if>
						</p>
					</c:when>
				</c:choose>
				<p>
					<a href="<c:url value="/admin/deleteQuiz/${quiz.id}/${quiz.roundId} " />" class="btn btn-danger">삭제</a>
					<c:choose>
						<c:when test="${quiz.type eq 'option'}">
							<a href="<c:url value="/admin/updateOptionQuiz/${quiz.id }" />"
						class="btn btn-warning btn-large">수정</a> 
						</c:when>
						<c:when test="${quiz.type eq 'ox'}">
							<a href="<c:url value="/admin/updateOxQuiz/${quiz.id }" />"
						class="btn btn-warning btn-large">수정</a> 
						</c:when>
					</c:choose>
					<a
						href="<c:url value="/admin/dashboard"/>" class="btn btn-info">뒤로
					</a>
				</p>
			</div>
			<c:if test="${quiz.imageName ne null}">
				<div class="col-md-6">
					<img src="<c:url value="/ui/static/images/${quiz.imageName}" />" alt="image"
						style="width: 80%" />
				</div>
			</c:if>
	
		</div>
	</div>
</div>
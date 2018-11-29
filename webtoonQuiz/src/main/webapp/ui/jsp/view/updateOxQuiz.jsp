<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="container-wrapper">

	<div class="container">
		<h1>Update OxQuiz</h1>
		<p class="lead">Modify the below information to update a product:</p>
		<sf:form
			action="${pageContext.request.contextPath }/admin/updateOxQuiz"
			method="post" modelAttribute="quiz" enctype="multipart/form-data">
			<sf:hidden path="id"/>
			<sf:hidden path="roundId"/>
			<sf:hidden path="type"/>
			<div class="form-group">
				<label for="name">문제 번호</label>
				<sf:input path="num" id="num" class="form-control" />
				<sf:errors path="num" cssStyle="color:#ff0000;" />
			</div>
			<div class="form-group">
				<label for="name">주제</label>
				<sf:input path="title" id="title" class="form-control" />
				<sf:errors path="title" cssStyle="color:#ff0000;" />
			</div>

			<div class="form-group">
				<label for="description">문제 내용 </label>
				<sf:textarea path="description" id="description"
					class="form-control" />
			</div>
			
			<div class="form-group">
				<label class="col-md-3 control-lable" for="file">이미지 업로드</label>
				<div class="col-md-7">
					<sf:input type="file" path="file" id="file"
						class="form-control input-sm" />
					<div class="has-error">
						<sf:errors path="file" class="help-inline" />
					</div>
				</div>
			</div>
			
			<div class="form-group">
				<label for="name">정답</label>
				<sf:input path="solution" id="solution" class="form-control" />
				<sf:errors path="solution" cssStyle="color:#ff0000;" />
			</div>
		
			<input type="submit" value="submit" class="btn btn-default">
			<a href="<c:url value="/admin/quizInventory"/>"
				class="btn btn-default">Cancel</a>

		</sf:form>
		<br />
	</div>
</div>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="container-wrapper">

	<div class="container" style="margin:100px">
		<h1>Add Option Quiz</h1>
		<p class="lead">Fill the below information to add a quiz</p>
		<sf:form
			action="${pageContext.request.contextPath }/admin/addOptionQuiz/${ quiz.roundId}"
			method="post" modelAttribute="quiz" enctype="multipart/form-data">
			
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
				<label for="optionOne">선택지 1 </label>
				<sf:textarea path="optionOne" id="optionOne"
					class="form-control" />
			</div>
			<div class="form-group">
				<label for="optionTwo">선택지 2 </label>
				<sf:textarea path="optionTwo" id="optionTwo"
					class="form-control" />
			</div>
			<div class="form-group">
				<label for="optionThree">선택지 3 </label>
				<sf:textarea path="optionThree" id="optionThree"
					class="form-control" />
			</div>
			<div class="form-group">
				<label for="optionFour">선택지 4 </label>
				<sf:textarea path="optionFour" id="optionFour"
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
{% extends './../layout.tpl' %}

{% block css %}
<link rel="stylesheet" href="/stylesheets/style.css">
{% endblock %}


{% block content %}
<div class="form-cells">
  <h1>用户登录</h1>
  <div class="form-cell">
    <input id="email" type="email" name="email" placeholder="邮箱">
  </div>
  <div class="form-cell">
    <input id="password" type="password" name="password" placeholder="密码">
  </div>
  <div class="form-cell">
    <button id="submit">登录</button>
    <input type="text" name="csrf" id="csrf" value="{{csrf}}" hidden>
  </div>
</div>
{% endblock %}
/* KB Portal for eFLOW - Eduardo Freitas - 2013 - radkiddo@gmail.com */
(function ($) {

    (function (gb, $, undefined) {
    
    	var pdfName, pdfUrl, pdfDownload;
    	
    	gb.pdfName = pdfName;
    	
    	gb.pdfUrl = pdfUrl;
    	
    	gb.pdfDownload = pdfDownload;
    	
    	gb.dummyLoad = function () {
    		var defUrl = 'http://www.doksend.com/kbportal/viewerj.html?title=VB.NET - Type IStationAccess is not defined&url=0.pdf';
    		$('#dummypdfdoc').attr('src', defUrl);
    	};
    
    	gb.urlParam = function (name) {
  			var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(top.window.location.href); 
  			return (results !== null) ? results[1] : 0;
		};
    
    	gb.replaceAll = function (str, token, newtoken) {
    		while (str.indexOf(token) != -1) {
        		str = str.replace(token, newtoken);
    		}
    		return str;
		};
		
		gb.cleanField = function (str) {
			str = gb.replaceAll(str, '"', '');
			str = gb.replaceAll(str, '\\', '');
			str = gb.replaceAll(str, '/', '');
			
			return str;
		};
		
		gb.showHideEmailMsg = function (ve, vfe, obj) {
			if (!ve) {
            	$(obj).removeClass('smallStrong').addClass('smallWeek');
            	$(obj).text('Invalid email syntax');
            }
            else if (!vfe) {
            	$(obj).removeClass('smallStrong').addClass('smallWeek');
            	$(obj).text('Free email accounts are not allowed, sorry');
            }
            else {
            	$(obj).removeClass('smallWeek').addClass('smallStrong');
            	$(obj).text('Valid email syntax');
            }
        };
    
    	gb.cStrengthPwdStrength = function (txt, obj) {
            var strength = gb.checkStrength(txt);

            if (strength.indexOf('Weak') >= 0) {
            	$(obj).removeClass('smallText').removeClass('smallTooShort').removeClass('smallGood').removeClass('smallStrong').addClass('smallWeek');
            } else if (strength.indexOf('Too short') >= 0) {
            	$(obj).removeClass('smallText').removeClass('smallWeek').removeClass('smallGood').removeClass('smallStrong').addClass('smallTooShort');
            } else if (strength.indexOf('Good') >= 0) {
            	$(obj).removeClass('smallText').removeClass('smallWeek').removeClass('smallTooShort').removeClass('smallStrong').addClass('smallGood');
            } else if (strength.indexOf('Strong') >= 0) {
            	$(obj).removeClass('smallText').removeClass('smallWeek').removeClass('smallTooShort').removeClass('smallGood').addClass('smallStrong');
            }

            $(obj).text(strength);
        };

        gb.cStrengthPwdRetypeStrength = function (txt, obj) {
           var strength = gb.checkStrength(txt);

           if (strength.indexOf('Weak') >= 0) {
           		$(obj).removeClass('smallText').removeClass('smallTooShort').removeClass('smallGood').removeClass('smallStrong').addClass('smallWeek');
            } else if (strength.indexOf('Too short') >= 0) {
                $(obj).removeClass('smallText').removeClass('smallWeek').removeClass('smallGood').removeClass('smallStrong').addClass('smallTooShort');
            } else if (strength.indexOf('Good') >= 0) {
            	$(obj).removeClass('smallText').removeClass('smallWeek').removeClass('smallTooShort').removeClass('smallStrong').addClass('smallGood');
            } else if (strength.indexOf('Strong') >= 0) {
            	$(obj).removeClass('smallText').removeClass('smallWeek').removeClass('smallTooShort').removeClass('smallGood').addClass('smallStrong');
            }

            $(obj).text(strength);
        };

        gb.dec = function (txt) {
            var result = '';

            $.ajax({
                url: '/k4e79e72Fe9ZWgcCaexsd7azLd',
                type: 'POST',
                cache: false,
                data: 'txt=' + txt,
                success: function (data) {
                    result = data;
                },
                error: function (jqXHR, textStatus, err) {}
            });

            return result;
        };

        gb.validateFreeEmail = function (emailAddress) {
            var pattern = new RegExp(/(aol|googlemail|msn|live|gmail|yahoo|hotmail)/);

            return pattern.test(emailAddress);
        };

        gb.validateEmail = function (emailAddress) {
            var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);

            return pattern.test(emailAddress);
        };

        gb.checkStrength = function (password) {
            var strength = 0, returnValue = '';

            if (password.length < 6) {
                $('#result').removeClass();
                $('#result').addClass('short');
                returnValue = 'Too short';
            }

            if (password.length > 7) {
                strength += 1;
            }
            if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                strength += 1;
            }
            if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
                strength += 1;
            }
            if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                strength += 1;
            }
            if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,",%,&,@,#,$,^,*,?,_,~])/)) {
                strength += 1;
            }

            if (strength < 2) {
                $('#result').removeClass();
                $('#result').addClass('weak');
                returnValue = 'Weak';
            } else if (strength === 2) {
                $('#result').removeClass();
                $('#result').addClass('good');
                returnValue = 'Good';
            } else {
                $('#result').removeClass();
                $('#result').addClass('strong');
                returnValue = 'Strong';
            }
            
            return returnValue;
        };

    }(window.gb = window.gb || {}, window.jQuery));

    (function (gb, signup, $, undefined) {

        var signedAlready = false;
        
        var _s = {
        
        	cStrengthSignupPwdStrength : function (txt) {
            	gb.cStrengthPwdStrength(txt, '#signupPwdStrength');
        	},

        	cStrengthSignupPwdRetypeStrength : function (txt) {
				gb.cStrengthPwdRetypeStrength(txt, '#signupPwdRetypeStrength');
        	},

        	hideSignupUserNotFoundOnKey : function () {
            	if ($('#signupUserExistsDiv').is(':visible')) {
                	$('#signupUserExistsDiv').hide();
            	}
        	},

        	hideSignupUserExceptionOnKey : function () {
            	if ($('#signupUserException').is(':visible')) {
                	$('#signupUserException').hide();
            	}
       		},

        	hideAllSignupMesssages : function () {
            	_s.hideSignupUserNotFoundOnKey();
            	_s.hideSignupUserExceptionOnKey();
        	},

        	clearFields : function () {
            	$('#signupfirstName').val('');
            	$('#signuplastName').val('');
            	$('#signupUserName').val('');
            	$('#signupPassword').val('');
            	$('#signupPasswordRetyped').val('');
       	 	},

        	ShowValidEmailMsg : function () {
            	$('#signupEmailValid').removeClass('smallWeek').addClass('smallStrong');
            	$('#signupEmailValid').text('Valid email syntax');
        	},

        	ShowInvalidEmailMsg : function () {
            	$('#signupEmailValid').removeClass('smallStrong').addClass('smallWeek');
            	$('#signupEmailValid').text('Invalid email syntax');
        	},

        	ShowInvalidFreeMsg : function () {
            	$('#signupEmailValid').removeClass('smallStrong').addClass('smallWeek');
            	$('#signupEmailValid').text('Free email accounts are not allowed, sorry');
        	},

        	ShowOrHideEmailMsg : function () {
            	if ($('#signupUserName').val() !== '') {
                	if (_s.ValidEmail()) {
                    	_s.ShowValidEmailMsg();
                	} else {
                    	_s.ShowInvalidEmailMsg();
                	}

                	if (!_s.ValidFreeMail()) {
                    	_s.ShowInvalidFreeMsg();
                	}
            	} else {
                	$('#signupEmailValid').text('');
            	}
        	},

        	NotEmpty : function () {
            	return (($('#signupfirstName').val() !== '') && ($('#signupUserName').val() !== '') && ($('#signuplastName').val() !== '') && ($('#signupPassword').val() !== '') && ($('#signupPasswordRetyped').val() !== '')) ? true : false;
        	},

       	 	ShowSignUpBtn : function () {
            	$('#signupButtonEnabled').removeAttr('disabled').removeClass('standart bg-color-gray').addClass('standart default bg-color-blue');
        	},

        	HideSignUpBtn : function () {
            	$('#signupButtonEnabled').attr('disabled', '').removeClass('standart default bg-color-blue').addClass('standart bg-color-gray');
        	},

        	ShowHidePwdNoMatch : function () {
            	if (($('#signupPassword').val() === '') && ($('#signupPasswordRetyped').val() === '')) {
                	$('#signupPwdNoMatch').text('');
            	} else if (_s.PwdNoMatch()) {
                	$('#signupPwdNoMatch').text('Passwords match');
                	$('#signupPwdNoMatch').removeClass('smallText').removeClass('smallWeek').addClass('smallStrong');
            	} else {
                	$('#signupPwdNoMatch').text('Passwords do not match');
                	$('#signupPwdNoMatch').removeClass('smallText').removeClass('smallStrong').addClass('smallWeek');
            	}
        	},

        	PwdNoMatch : function () {
            	return ($('#signupPassword').val() === $('#signupPasswordRetyped').val()) ? true : false;
        	},

        	ValidFreeMail : function () {
            	return (!gb.validateFreeEmail($('#signupUserName').val()));
        	},

        	ValidEmail : function () {
            	return (gb.validateEmail($('#signupUserName').val()));
        	},

        	ShowOrHideBth : function () {
            	if ((_s.NotEmpty()) && (_s.PwdNoMatch()) && (_s.ValidFreeMail()) && (_s.ValidEmail())) {
                	_s.ShowSignUpBtn();
            	} else {
                	_s.HideSignUpBtn();
            	}
        	},

        	ClearPwds : function () {
            	$('#signupPassword').val('');
            	$('#signupPasswordRetyped').val('');

            	$('#signupPwdStrength').text('');
            	$('#signupPwdRetypeStrength').text('');
            	$('#signupPwdNoMatch').text('');
        	},

        	ClearUserAndPwds : function () {
            	_s.ClearPwds();

            	$('#signupUserName').val('');
            	$('#signupEmailValid').text('');
        	},

        	unhandledSignupException : function () {
            	signedAlready = false;

           	 	$('#signupUserException').show().delay(10500).fadeOut('slow', function () {});

            	_s.ClearUserAndPwds();
            	_s.HideSignUpBtn();

            	$('#signupfirstName').focus();
        	},

        	SignupActivation : function () {
            	signedAlready = false;

            	_s.initSignupDiv();
            	_s.HideSignUpBtn();

            	window.location.href = '#/signupactivation';
        	},

        	SignupFailedMsg : function () {
            	signedAlready = false;

            	$('#signupUserExistsDiv').show().delay(10500).fadeOut('slow', function () {});

            	_s.ClearUserAndPwds();
            	_s.HideSignUpBtn();

            	$('#signupfirstName').focus();
        	},
        	
        	initSignupDiv : function () {
            	_s.hideAllSignupMesssages();
            	_s.clearFields();
            	_s.ClearUserAndPwds();

            	$('#signupfirstName').focus();
       	 	},

        	signupBtnClick : function () {
            	if ((_s.NotEmpty()) && (_s.PwdNoMatch()) && (_s.ValidFreeMail()) && (_s.ValidEmail()) && (!signedAlready)) {
                	signedAlready = true;
                	
                	_s.HideSignUpBtn();

               		var fn = $('#signupfirstName').val(),
                    	ln = $('#signuplastName').val(),
                    	un = $('#signupUserName').val(),
                    	pw = $('#signupPassword').val();

                	$.ajax({
                    	url: '/kChUTqbUjO2DtKgXLG4LIjzzLd',
                    	type: 'POST',
                    	cache: false,
                    	data: 'txt=' + escape(pw),
                    	success: function (data) {

                        	var pd = data,
                            	dt = 'fn=' + escape(fn) + '&ln=' + escape(ln) + '&un=' + escape(un) + '&pwd=' + escape(pd) + '&to=' + escape(un);

                        	$.ajax({
                            	url: '/signup/do',
                            	type: 'POST',
                            	cache: false,
                            	data: dt,
                            	success: function (data) {
                                	var res = JSON.stringify(data);

                                	if (res.indexOf('signup OK') >= 0) { _s.SignupActivation(); 
                                	} else if (res.indexOf('already exists') >= 0) { _s.SignupFailedMsg(); 
                                	} else { _s.unhandledSignupException(); 
                                	}
                            	},
                            	error: function (jqXHR, textStatus, err) {
                                	_s.unhandledSignupException();
                            	}
                        	});
                    	},
                    	error: function (jqXHR, textStatus, err) {
                        	_s.unhandledSignupException();
                    	}
                	});
            	}

            	return false;
        	}
        };
        
        signup.initSignupDiv = function () {
        	_s.initSignupDiv();
        };

        $('#signupButtonEnabled').click(function () {
            _s.signupBtnClick();
            return false;
        });
        
        $('#signupPassword').keyup(function (e) {
            if (e.which !== 13) {
            	_s.hideAllSignupMesssages();
            }

            _s.ShowOrHideBth();
            _s.ShowHidePwdNoMatch();

            if ($('#signupPassword').val() !== '') {
            	_s.cStrengthSignupPwdStrength($('#signupPassword').val());
            } else {
            	$('#signupPwdStrength').text('');
            }
        });

        $('#signupPasswordRetyped').keyup(function (e) {
            if (e.which !== 13) {
                _s.hideAllSignupMesssages();
            }

            _s.ShowOrHideBth();
            _s.ShowHidePwdNoMatch();

            if ($('#signupPasswordRetyped').val() !== '') {
                _s.cStrengthSignupPwdRetypeStrength($('#signupPasswordRetyped').val());
            } else {
                $('#signupPwdRetypeStrength').text('');
            }
        });

        $('#signupPassword').focusout(function (e) {
            if ($('#signupPassword').val() !== '') {
                _s.cStrengthSignupPwdStrength($('#signupPassword').val());
            } else {
                $('#signupPwdStrength').text('');
            }
        });

        $('#signupPasswordRetyped').focusout(function (e) {
            if ($('#signupPasswordRetyped').val() !== '') {
                _s.cStrengthSignupPwdRetypeStrength($('#signupPasswordRetyped').val());
            } else {
                $('#signupPwdRetypeStrength').text('');
            }
        });
        
        $('#signupfirstName').keypress(function (e) {
            	if ((e.which === 13) && ($('#signupfirstName').val() !== '')) {
                	$('#signuplastName').focus();
            	}
        	});

        $('#signupfirstName').keyup(function (e) {
            if (e.which !== 13) {
                _s.hideAllSignupMesssages();
            }

            _s.ShowOrHideBth();
        });

        $('#signuplastName').keypress(function (e) {
            if ((e.which === 13) && ($('#signuplastName').val() !== '')) {
                $('#signupUserName').focus();
            }
        });
        
        $('#signupfirstName').live('input', function (e) {
        	_s.hideAllSignupMesssages();
            _s.ShowOrHideBth();
        });

        $('#signuplastName').keyup(function (e) {
            if (e.which !== 13) {
                _s.hideAllSignupMesssages();
            }

            _s.ShowOrHideBth();
        });
        
        $('#signuplastName').live('input', function (e) {
        	_s.hideAllSignupMesssages();
            _s.ShowOrHideBth();
        });
        
        $('#signupUserName').keypress(function (e) {
            if ((e.which === 13) && ($('#signupUserName').val() !== '')) {
                $('#signupPassword').focus();
            }
        });
        
        $('#signupUserName').live('input', function (e) {
        	_s.hideAllSignupMesssages();
            _s.ShowOrHideBth();
        });
        
        $('#signupUserName').keyup(function (e) {
            if (e.which !== 13) {
                _s.hideAllSignupMesssages();
            }

            _s.ShowOrHideEmailMsg();
            _s.ShowOrHideBth();
        });

        $('#signupUserName').focusout(function (e) {
            _s.ShowOrHideEmailMsg();

            var str = $('#signupUserName').val();
            str = gb.cleanField(str);
            $('#signupUserName').val(str.toLowerCase());
        });

        $('#signupPassword').keypress(function (e) {
            if ((e.which === 13) && ($('#signupPassword').val() !== '')) {
                $('#signupPasswordRetyped').focus();
            }
        });
        
        $('#signupPasswordRetyped').keypress(function (e) {
            if ((e.which === 13) && (_s.NotEmpty())) {
                $('#signupButtonEnabled').trigger('click');
            }
        });

    }(window.gb, window.signup = window.signup || {}, window.jQuery));

    (function (logout, $, undefined) {

        $('#logoutButtonEnabled').click(function () {
            var user = $.cookie('kplgckie');

            if (user !== null) {
                $.removeCookie('kplgckie', user, {
                    expires: 1,
                    path: '/'
                });
            }

            window.location.href = '#/login';

            return false;
        });

    }(window.logout = window.logout || {}, window.jQuery));
    
    (function (gb, kportal, $, undefined) {
    
    	var items = [], itemsRaw = [];
    
    	var _k = {
    		
    		clearSearchField : function () {
    			$('#searchKPortal').val('');
    		},
    		
    		getItems : function () {
    			$.getJSON('k4e2550htyjrtyj4345435/articles', function(data) {
  					items = [];
  					itemsRaw = [];
 
  					$.each(data, function(key, val) {
    					items.push('<li><a href="' + val + '">' + key + '</a></li><br />');
    					itemsRaw.push(key);
  					});
 
  					$('<ul>', {
    					html: items.join('')
  					}).appendTo('#names');
				});
    		},
    		
    		addListItems : function () {
    			_k.getItems();
    		},
    		
    		initKPortalDiv : function () {
    			_k.clearSearchField();
    			_k.addListItems();
    			
    			$('#search').focus();
    		},
    		
    		defaultList : function () {
    			$("#names").html('');
    					
    			$('<ul>', {
    				html: items.join('')
  				}).appendTo('#names');
    		},
    		
    		doSearch : function (value) {
    			if (value !== '') {
    				var itemsSearched = [];
    				
    				for (var i = 0; i <= itemsRaw.length - 1; i++) {
    					if (itemsRaw[i].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
    						itemsSearched.push(items[i]);
    					}
    				}
    				
    				if (itemsSearched.length > 0) {
    					$("#names").html('');
    					
    					$('<ul>', {
    						html: itemsSearched.join('')
  						}).appendTo('#names');
    				}
    			}
    			else {
    				_k.defaultList();
    			}
    		},
    		
    		search : function (str) {
    			var arrStr = str.split(' ');
    		
    			if (arrStr !== undefined && arrStr.length > 0) {
    				for (var i = 0; i < arrStr.length; i++) {
    					if (arrStr[i] !== '' && arrStr[i] !== ' ') {
    						_k.doSearch(arrStr[i]);
    					}
    				}
    				
    				for (var i = 0; i < arrStr.length; i++) {
    					if (arrStr[i] !== '' && arrStr[i] !== ' ') {
    						$('#names').highlight(arrStr[i]);
    					}
    				}
    			}
    			else {
    				_k.doSearch(str);
    				$('#names').highlight(str);
    			}
    		},
    		
    		runSearch : function () {
    			if ($("#search").val() !== '') {
    				_k.search($("#search").val());
    			}
    			else {
    				_k.defaultList();
  				
  					$('#highlight-plugin').removeHighlight();
    			}
    		}
    		
    	};
    	
    	kportal.initKPortalDiv = function () {
    		_k.initKPortalDiv();
    	};
    	
    	$("#search").keyup(function (e) {
    		_k.runSearch();
    	});
        
        $('#search').live('input', function (e) {
            _k.runSearch();
        });
        
        $('#names').delegate('a', 'click', function(e) {
        	e.preventDefault();
        	
        	gb.pdfName = $(this).text();
        	
        	var str = $(this).attr('href');
        	var arr = str.split('|');
        		
        	gb.pdfUrl = arr[0];
        	gb.pdfDownload = arr[1];
        	
        	window.location.href = '#/viewer';
        });
    
    }(window.gb, window.kportal = window.kportal || {}, window.jQuery));
    
    (function (gb, viewer, $, undefined) {
    	
    	var _v = {
    	
    		hidePdfViewer : function () {
                $('#pdfdiv').hide();
    		},
    		
    		stViewer : function () {
    			var defUrl = 'http://www.doksend.com/kbportal/viewerj.html?title=' + gb.pdfName + '&url=' + gb.pdfDownload;
    		
    			if (gb.pdfName.toLowerCase().indexOf('.ppt') < 0) {
    				$('#mypdfdoc').attr('src', defUrl);
    				
    				$('#renderMsg1').text('Some PDFs can take time to render, please be patient.');
					$('#renderMsg2').text('You may also download the file first if you do not wish to wait for the rendering.');
    				
    				$('#mypdfdocdiv').hide();
    				$('#preparing_mypdfdocdiv').show();
    				
    				new easyXDM.Socket({
    					remote: defUrl,
    					onMessage: function(message, origin) {
        					$('#preparing_mypdfdocdiv').hide();
        					$('#mypdfdocdiv').show();
    					}
					});
				}
				else {
					$('#renderMsg1').text('This document has no preview. You may download it.');
					$('#renderMsg2').text('');
					
					$('#mypdfdocdiv').hide();
					$('#preparing_mypdfdocdiv').hide();
				}
			
				$('#pdfh1').text('Article: ' + gb.pdfUrl);
				$('#pdfN').text(gb.pdfName);
			
				$(window).scrollTop(0);
    		
    			_v.showPdfViewer();
    		},
    		
    		showPdfViewer : function () {
                $('#pdfdiv').show();
    		}
    	
    	};
    	
    	viewer.startViewer = function () {
    		if (gb.pdfUrl !== undefined)
    		{
    			_v.stViewer();
    		}
    		else
    			window.location.href = '#/portal';
    	};
    	
    	viewer.hidePdfViewer = function () {
    		_v.hidePdfViewer();
    	};
    	
    	$('#downloadBtn').live('click', function(e) {
    		var url = 'http://www.doksend.com/kbportal/download.php?url=' + gb.pdfDownload + 
    			"&name=" + gb.pdfName;
    		
    		e.preventDefault();
    		$(this).attr('href', url);
    		
    		window.location.href = url;
    	});
    	
    }(window.gb, window.viewer = window.viewer || {}, window.jQuery));

    (function (login, $, undefined) {

        var splgrm = null;
        
        var _l = {

        	showLoginButton : function () {
            	$('#loginButtonEnabled').removeAttr('disabled').removeClass('standart bg-color-gray').addClass('standart default bg-color-blue');
        	},

        	hideLoginButton : function () {
            	$('#loginButtonEnabled').attr('disabled', '').removeClass('standart default bg-color-blue').addClass('standart bg-color-gray');
        	},

        	hideLoginMessages : function () {
            	$('#loginUserNotFoundDiv').hide();
            	$('#loginUserException').hide();
        	},

        	hideLoginUserNotFoundOnKey : function () {
            	if ($('#loginUserNotFoundDiv').is(':visible')) {
                	$('#loginUserNotFoundDiv').hide();
            	}
        	},

        	hideLoginUserExceptionOnKey : function () {
        		if ($('#loginUserException').is(':visible')) {
                	$('#loginUserException').hide();
            	}
        	},

        	hideAllLoginMesssages : function () {
            	_l.hideLoginUserNotFoundOnKey();
            	_l.hideLoginUserExceptionOnKey();
        	},

        	enableControlsByDiv : function () {
            	if ($('#logindiv').is(':visible')) {
                	_l.hideLoginButton();
                	_l.hideLoginMessages();
            	}
        	},

        	clearLoginFields : function () {
            	if (!$('#LoginRememberMe').attr('checked')) {
                	$('#loginUserName').val('');
            	}
            	$('#loginPassword').val('');
        	},

        	userNotFound : function () {
            	$('#loginUserNotFoundDiv').show().delay(10500).fadeOut('slow', function () {});

            	_l.clearLoginFields();
            	_l.hideLoginButton();

            	if (!$('#LoginRememberMe').attr('checked')) {
                	_l.showUncheckedRememberMe();
            	} else {
                	_l.showCheckedRememberMe();
            	}

            	$('#loginUserName').focus();
        	},

        	unhandledLoginException : function () {
            	$('#loginUserException').show().delay(10500).fadeOut('slow', function () {});

            	_l.clearLoginFields();
            	_l.hideLoginButton();

            	if (!$('#LoginRememberMe').attr('checked')) {
                	_l.showUncheckedRememberMe();
            	} else {
                	_l.showCheckedRememberMe();
            	}

            	$('#loginUserName').focus();
        	},

        	showUncheckedRememberMe : function () {
            	$('#LoginRememberMe').removeAttr('checked');
        	},

        	showCheckedRememberMe : function () {
            	$('#LoginRememberMe').attr('checked', '');
        	},

        	initCheckBoxes : function () {
            	_l.showUncheckedRememberMe();
        	},

        	get_splgrm : function () {
            	_l.showCheckedRememberMe();
            	$('#loginUserName').val(splgrm);
        	},

        	getCheckboxesStatus : function () {
            	splgrm = $.cookie('kplgrm');

            	if (splgrm === null) {
                	_l.showUncheckedRememberMe();
            	} else {
                	_l.showCheckedRememberMe();
            	}
        	},

    		createRememberMe : function () {
            	$.cookie('kplgrm', $('#loginUserName').val(), {
                	expires: 30,
                	path: '/'
            	});
        	},

        	removeRememberMe : function () {
            	$.removeCookie('kplgrm', $('#loginUserName').val(), {
                	expires: 30,
                	path: '/'
            	});
        	},
        	
        	loginCkie : function (user) {
				$.cookie('kplgckie', unescape(user), {
                	expires: 1,
                	path: '/'
            	});
        	},

        	LoggedIn : function (user) {
            	_l.clearLoginFields();
            	_l.hideLoginButton();

            	_l.loginCkie(user);
    			
            	window.location.href = '#/portal';
        	},

        	createCkies : function () {
            	if ($('#LoginRememberMe').attr('checked')) {
                	_l.createRememberMe();
            	} else if (!$('#LoginRememberMe').attr('checked')) {
                	_l.removeRememberMe();
            	}
        	},
        	
        	initLoginDiv : function () {
            	_l.getCheckboxesStatus();

            	_l.initCheckBoxes();
            	_l.clearLoginFields();
            	_l.hideLoginButton();
            	_l.hideLoginUserNotFoundOnKey();
            	_l.hideLoginUserExceptionOnKey();

            	if (splgrm !== null) {
                	_l.get_splgrm();
            	}

            	$('#loginUserName').focus();
            	_l.kEmMsg();
        	},

        	NotRemembering : function () {
            	
            	if (($('#loginUserName').val() !== '') && ($('#loginPassword').val() !== '')) {
                	var txt = $('#loginPassword').val();
                	_l.hideLoginButton();

                	$.ajax({
                    	url: '/kChUTqbUjO2DtKgXLG4LIjzzLd',
                    	type: 'POST',
                    	cache: false,
                    	data: 'txt=' + escape(txt),
                    	success: function (data) {
                       		var pd = data,
                            	us = $('#loginUserName').val();

                        	_l.createCkies();

                        	$.ajax({
                            	url: '/login/do',
                            	type: 'POST',
                            	cache: false,
                            	data: 'un=' + escape(us) + '&pwd=' + escape(pd),
                            	success: function (data) {
                                	var res = JSON.stringify(data);
                                	
                                	// User found and login...
                                	if (res.indexOf('found OK') >= 0) {
                                    	_l.LoggedIn(us);
                                	} else // User not found...
                                	{
                                    	_l.userNotFound();
                                	}
                            	},
                            	error: function (jqXHR, textStatus, err) {
                                	_l.unhandledLoginException();
                            	}
                        	});
                    	},
                    	error: function (jqXHR, textStatus, err) {
                        	_l.unhandledLoginException();
                    	}
                	});
            	}

            	return false;
        	},

        	loginBtnClick : function () {
            	_l.NotRemembering();

            	return false;
        	},
        	
        	kEmMsg : function () {
        		var ve = gb.validateEmail($('#loginUserName').val()),
					vfe = !gb.validateFreeEmail($('#loginUserName').val());

				_l.showHideEmailMsg(ve, vfe);
        	},
        	
        	kUp : function (e) {
        		_l.kEmMsg();
        		
        		if (e.which !== 13) {
                	_l.hideAllLoginMesssages();
            	}

            	if (($('#loginUserName').val() !== '') && ($('#loginPassword').val() !== '')) {
                	_l.showLoginButton();
            	} else {
                	_l.hideLoginButton();
            	}
        	},
        	
        	kInput : function () {
        		_l.kEmMsg();
        		_l.hideAllLoginMesssages();

            	if (($('#loginUserName').val() !== '') && ($('#loginPassword').val() !== '')) {
                	_l.showLoginButton();
            	} else {
                	_l.hideLoginButton();
            	}
        	},
        	
        	showHideEmailMsg : function (ve, vfe) {
        		if ($('#loginUserName').val() !== 'radkiddo') {
        			gb.showHideEmailMsg(ve, vfe, '#loginEmailMsg');
        		}
        		else {
        			$('#loginEmailMsg').text('');
        		}
    		},
        };
        
        $('#loginUserName').focusout(function (e) {
            var str = $('#loginUserName').val();
            str = gb.cleanField(str);
            $('#loginUserName').val(str.toLowerCase());
        });

        $('#loginUserName').keyup(function (e) {
            _l.kUp(e);
            
            if ((e.which === 13) && ($('#loginUserName').val() !== '')) {
                $('#loginPassword').focus();
            }
        });
        
        $('#loginUserName').live('input', function (e) {
            _l.kInput();
        });

        $('#loginPassword').keyup(function (e) {
             _l.kUp(e);
             
             if ((e.which === 13) && ($('#loginUserName').val() !== '') && ($('#loginPassword').val() !== '')) {
                $('#loginButtonEnabled').trigger('click');
            }
        });
        
        $('#loginButtonEnabled').click(function () {
            _l.loginBtnClick();
            return false;
        });	
        
        login.initLoginDiv = function () {
            _l.initLoginDiv();
        };

    }(window.login = window.login || {}, window.jQuery));
    
    (function(usersettings, $, undefined) {
    
    	var _us = {
			
    		cStrengthSettingsPwdStrength : function (txt) {
            	gb.cStrengthPwdStrength(txt, '#settingsPwdStrength');
        	},

        	cStrengthSettingsPwdRetypeStrength : function (txt) {
				gb.cStrengthPwdRetypeStrength(txt, '#settingsPwdRetypeStrength');
        	},

        	hideSettingsUserExceptionOnKey : function () {
            	if ($('#settingsUserException').is(':visible')) {
                	$('#settingsUserException').hide();
            	}
       		},

        	hideAllSettingsMesssages : function () {
            	_us.hideSettingsUserExceptionOnKey();
        	},
        	
        	clearFields : function () {
            	$('#settingsfirstName').val('');
            	$('#settingslastName').val('');
            	$('#settingsPassword').val('');
            	$('#settingsPasswordRetyped').val('');
       	 	},
       	 	
       	 	NotEmpty : function () {
            	return (($('#settingsfirstName').val() !== '') && ($('#settingslastName').val() !== '') && ($('#settingsPassword').val() !== '') && ($('#settingsPasswordRetyped').val() !== '')) ? true : false;
        	},

       	 	ShowSignUpBtn : function () {
            	$('#settingsButtonEnabled').removeAttr('disabled').removeClass('standart bg-color-gray').addClass('standart default bg-color-blue');
        	},

        	HideSignUpBtn : function () {
            	$('#settingsButtonEnabled').attr('disabled', '').removeClass('standart default bg-color-blue').addClass('standart bg-color-gray');
        	},
        	
        	ShowHidePwdNoMatch : function () {
            	if (($('#settingsPassword').val() === '') && ($('#settingsPasswordRetyped').val() === '')) {
                	$('#settingsPwdNoMatch').text('');
            	} else if (_us.PwdNoMatch()) {
                	$('#settingsPwdNoMatch').text('Passwords match');
                	$('#settingsPwdNoMatch').removeClass('smallText').removeClass('smallWeek').addClass('smallStrong');
            	} else {
                	$('#settingsPwdNoMatch').text('Passwords do not match');
                	$('#settingsPwdNoMatch').removeClass('smallText').removeClass('smallStrong').addClass('smallWeek');
            	}
        	},

        	PwdNoMatch : function () {
            	return ($('#settingsPassword').val() === $('#settingsPasswordRetyped').val()) ? true : false;
        	},
        	
        	ShowOrHideBth : function () {
            	if ((_us.NotEmpty()) && (_us.PwdNoMatch())) {
                	_us.ShowSignUpBtn();
            	} else {
                	_us.HideSignUpBtn();
            	}
        	},
        	
        	ClearPwds : function () {
            	$('#settingsPassword').val('');
            	$('#settingsPasswordRetyped').val('');

            	$('#settingsPwdStrength').text('');
            	$('#settingsPwdRetypeStrength').text('');
            	$('#settingsPwdNoMatch').text('');
        	},
        	
        	unhandledSettingsException : function () {
           	 	$('#settingsUserException').show().delay(10500).fadeOut('slow', function () {});

            	_us.ClearPwds();
            	_us.HideSignUpBtn();

            	$('#settingsfirstName').focus();
        	},
        	
        	assignFields : function (result) {
        		var jsonStr = result.split('|');
        		_us.hasLoaded = true;

				if (jsonStr !== null && jsonStr.length === 2)
				{
        			$('#settingsfirstName').val(gb.replaceAll(jsonStr[0], '"', ''));
        			$('#settingslastName').val(gb.replaceAll(jsonStr[1], '"', ''));
        		}
        		
        		$('#settingsfirstName').focus();
        	},
        	
        	couldLoadUserSettings : function () {
        		$('#usersettingsdiv').show();
        		$('#usersettingsfaileddiv').hide();
        	},
        	
        	couldNotLoadUserSettings : function () {
        		$('#usersettingsdiv').hide();
        		$('#usersettingsfaileddiv').show();
        	},
        	
        	loadData : function () {
        		var un = unescape($.cookie('kplgckie'));
        		
        		$.ajax({
        			url: '/usersettings/load',
                    type: 'POST',
                    cache: false,
                    data: 'un=' + escape(un),
                    success: function (data) {
                    	var res = JSON.stringify(data);

                        if (!res.indexOf('not loaded') >= 0) {
                        	_us.showSettingsDiv(res);
                        }
                        else {
                        	_us.couldNotLoadUserSettings();
                        }
                    },
                    error: function (jqXHR, textStatus, err) {
                    	_us.couldNotLoadUserSettings();
                    }
        		});
        	},
        	
        	initSettingsDiv : function () {
            	_us.loadData();
       	 	},
       	 	
       	 	clearAll : function () {
       	 		_us.hideAllSettingsMesssages();
            	_us.ClearPwds();
            	
            	$('#settingsfirstName').val('');
            	$('#settingslastName').val('');
            	
            	_us.HideSignUpBtn();
       	 		$('#settingsfirstName').focus();
       	 	},
       	 	
       	 	showSettingsDiv : function (res) {
       	 		_us.assignFields(res);
            	_us.couldLoadUserSettings();
            	_us.hideAllSettingsMesssages();
            	_us.ClearPwds();

            	$('#settingsfirstName').focus();
       	 	},
       	 	
       	 	settingsOk : function () {
				_us.clearAll();
				window.location.href = '#/portal';
       	 	},
       	 	
       	 	settingsBtnClick : function () {
            	if ((_us.NotEmpty()) && (_us.PwdNoMatch())) {
                	_us.HideSignUpBtn();

               		var fn = $('#settingsfirstName').val(),
                    	ln = $('#settingslastName').val(),
                    	pw = $('#settingsPassword').val(),
                    	un = unescape($.cookie('kplgckie'));

                	$.ajax({
                    	url: '/kChUTqbUjO2DtKgXLG4LIjzzLd',
                    	type: 'POST',
                    	cache: false,
                    	data: 'txt=' + escape(pw),
                    	success: function (data) {

                        	var pd = data,
                            	dt = 'fn=' + escape(fn) + '&ln=' + escape(ln) + '&un=' + escape(un) + '&pwd=' + escape(pd) + '&to=' + escape(un);

                        	$.ajax({
                            	url: '/usersettings/do',
                            	type: 'POST',
                            	cache: false,
                            	data: dt,
                            	success: function (data) {
                                	var res = JSON.stringify(data);

                                	if (res.indexOf('settings saved') >= 0) { _us.settingsOk(); 
                                	} else { _us.unhandledSettingsException(); 
                                	}
                            	},
                            	error: function (jqXHR, textStatus, err) {
                                	_us.unhandledSettingsException();
                            	}
                        	});
                    	},
                    	error: function (jqXHR, textStatus, err) {
                        	_us.unhandledSettingsException();
                    	}
                	});
            	}

            	return false;
        	}
    			
    	};
    	
    	usersettings.initSettingsDiv = function () {
        	_us.initSettingsDiv();
        };

        $('#settingsButtonEnabled').click(function () {
            _us.settingsBtnClick();
            return false;
        });
        
        $('#settingsPassword').keyup(function (e) {
            if (e.which !== 13) {
            	_us.hideAllSettingsMesssages();
            }

            _us.ShowOrHideBth();
            _us.ShowHidePwdNoMatch();

            if ($('#settingsPassword').val() !== '') {
            	_us.cStrengthSettingsPwdStrength($('#settingsPassword').val());
            } else {
            	$('#settingsPwdStrength').text('');
            }
        });

        $('#settingsPasswordRetyped').keyup(function (e) {
            if (e.which !== 13) {
                _us.hideAllSettingsMesssages();
            }

            _us.ShowOrHideBth();
            _us.ShowHidePwdNoMatch();

            if ($('#settingsPasswordRetyped').val() !== '') {
                _us.cStrengthSettingsPwdRetypeStrength($('#settingsPasswordRetyped').val());
            } else {
                $('#settingsPwdRetypeStrength').text('');
            }
        });

        $('#settingsPassword').focusout(function (e) {
            if ($('#settingsPassword').val() !== '') {
                _us.cStrengthSettingsPwdStrength($('#settingsPassword').val());
            } else {
                $('#settingsPwdStrength').text('');
            }
        });

        $('#settingsPasswordRetyped').focusout(function (e) {
            if ($('#settingsPasswordRetyped').val() !== '') {
                _us.cStrengthSettingsPwdRetypeStrength($('#settingsPasswordRetyped').val());
            } else {
                $('#settingsPwdRetypeStrength').text('');
            }
        });
        
        $('#settingsfirstName').keypress(function (e) {
            	if ((e.which === 13) && ($('#settingsfirstName').val() !== '')) {
                	$('#settingslastName').focus();
            	}
        	});

        $('#settingsfirstName').keyup(function (e) {
            if (e.which !== 13) {
                _us.hideAllSettingsMesssages();
            }

            _us.ShowOrHideBth();
        });

        $('#settingslastName').keypress(function (e) {
            if ((e.which === 13) && ($('#settingslastName').val() !== '')) {
                $('#settingsPassword').focus();
            }
        });
        
        $('#settingsfirstName').live('input', function (e) {
        	_us.hideAllSettingsMesssages();
            _us.ShowOrHideBth();
        });

        $('#settingslastName').keyup(function (e) {
            if (e.which !== 13) {
                _us.hideAllSettingsMesssages();
            }

            _us.ShowOrHideBth();
        });
        
        $('#settingslastName').live('input', function (e) {
        	_us.hideAllSettingsMesssages();
            _us.ShowOrHideBth();
        });

        $('#settingsPassword').keypress(function (e) {
            if ((e.which === 13) && ($('#settingsPassword').val() !== '')) {
                $('#settingsPasswordRetyped').focus();
            }
        });
        
        $('#settingsPasswordRetyped').keypress(function (e) {
            if ((e.which === 13) && (_us.NotEmpty())) {
                $('#settingsButtonEnabled').trigger('click');
            }
        });
    
    }(window.usersettings = window.usersettings || {}, window.jQuery));
    
    (function(recover, $, undefined) {
    
    	var _r = {
    	
    		hideRecoverUserFoundOnKey : function () {
            	if ($('#recoverUserFoundDiv').is(':visible')) {
                	$('#recoverUserFoundDiv').hide();
            	}
        	},
        	
        	showRecoverUserFoundOnKey : function () {
        		$('#recoverUserFoundDiv').show();
        	},
    		
    		hideRecoverUserNotFoundOnKey : function () {
            	if ($('#recoverUserNotFoundDiv').is(':visible')) {
                	$('#recoverUserNotFoundDiv').hide();
            	}
        	},
        	
        	showRecoverUserNotFoundOnKey : function () {
        		$('#recoverUserNotFoundDiv').show();
        	},
        	
        	hideRecoverUserExceptionOnKey : function () {
        		if ($('#recoverUserException').is(':visible')) {
                	$('#recoverUserException').hide();
            	}
        	},
        	
        	showRecoverUserExceptionOnKey : function () {
        		$('#recoverUserException').show();
        	},
    		
    		hideAllRecoverMesssages : function () {
    			_r.hideRecoverUserNotFoundOnKey();
    			_r.hideRecoverUserExceptionOnKey();
    			_r.hideRecoverUserFoundOnKey();
    		},
    		
    		showRecoverButton : function () {
    			$('#recoverButtonEnabled').removeAttr('disabled').removeClass('standart bg-color-gray').addClass('standart default bg-color-blue');
    		},
    		
    		hideRecoverButton : function () {
    			$('#recoverButtonEnabled').attr('disabled', '').removeClass('standart default bg-color-blue').addClass('standart bg-color-gray');
    		},
    		
    		baseRecoverDiv : function () {
    			$('#recoverEmail').val('');
    			$('#recoverEmailMsg').text('');
    			
    			_r.hideRecoverButton();
    		},
    		
    		initRecoverDiv : function () {
    			_r.baseRecoverDiv();
    			_r.hideAllRecoverMesssages();
    			
    			$('#recoverEmail').focus();
    		},
    		
    		showHideRecoverButton : function (ve, vfe) {
    			if (ve && vfe) {
                	_r.showRecoverButton();
            	} else {
                	_r.hideRecoverButton();
            	}
    		},
    		
    		showHideEmailMsg : function (ve, vfe) {
            	gb.showHideEmailMsg(ve, vfe, '#recoverEmailMsg');
    		},
    		
    		recovered : function () {
    			_r.initRecoverDiv();
    			window.location.href = '#/recovered';
    		},
    		
    		userNotFound : function () {
    			$('#recoverUserNotFoundDiv').show().delay(10500).fadeOut('slow', function () {});
    			_r.baseRecoverDiv();
    		},
    		
    		unhandledRecoverException : function () {
    			$('#recoverUserException').show().delay(10500).fadeOut('slow', function () {});
    			_r.hideRecoverButton();
    			$('#recoverEmail').focus();
    		},
    		
    		recoverBtnClick : function () {
    			var un = $('#recoverEmail').val();
    			
    			if (un !== '')
    			{
    				_r.hideRecoverButton();
    			
    				$.ajax({
						url: '/recover/do',
    					type: 'POST',
    					cache: false,
    					data: 'to=' + escape(un),
    					success: function (data) {
    						var res = JSON.stringify(data);
    						
    						// User found...
    						if (res.indexOf('recovered OK') >= 0) {
    							_r.recovered();
    						} else // User not found...
    						{
    							_r.userNotFound();
    						}
    					},
    					error: function (jqXHR, textStatus, err) {
    						_r.unhandledRecoverException();
    					}
					});
				}
				
				return false;
    		},
    		
    		fieldChange : function (e) {
    			var ve = gb.validateEmail($('#recoverEmail').val()),
            		vfe = !gb.validateFreeEmail($('#recoverEmail').val());
            	
            	_r.showHideRecoverButton(ve, vfe);
            
                _r.hideAllRecoverMesssages();
                _r.showHideEmailMsg(ve, vfe);
            	
            	if (e.which === 13) {
            		$('#recoverButtonEnabled').trigger('click');
            	}
    		}
    	};
        
        $('#recoverEmail').live('input', function (e) {
            _r.fieldChange(e);
        });
    	
    	$('#recoverEmail').focusout(function (e) {
    		if ($('#recoverEmail').val() === '') {
    			$('#recoverEmailMsg').text('');
    		}
    		else {
    			var str = $('#recoverEmail').val();
    			str = gb.cleanField(str);
    			$('#recoverEmail').val(str.toLowerCase());
    		}
    	});
    	
    	$('#recoverEmail').keyup(function (e) {
            _r.fieldChange(e);
        });
    	
    	$('#recoverButtonEnabled').click(function () {
            _r.recoverBtnClick();
            return false;
        });
    	
    	recover.initRecoverDiv = function () {
    		_r.initRecoverDiv();
    	};
    
    }(window.recover = window.recover || {}, window.jQuery));
    
    (function(carousels, $, undefined) {
	
		var _c = {
			toggleSlide : function () {
				if ($('#slide1').is(':visible')) {
 					$('#slide1').delay(100).hide();
 					$('#slide2').show();
 				}
 				else {
 					$('#slide2').delay(100).hide();
 					$('#slide1').show();
 				}
			},
			
			nextSlide : function () {
				_c.toggleSlide();
			},
			
			start : function () {
				$('#slide2').show();
				
				window.setInterval(function () {
 					_c.toggleSlide();
				}, 5000);
			}
		};
		
		carousels.start = function () {
			_c.start();
		};
		
		$('#backSlide').click(function () {
            _c.nextSlide();
        });
        
        $('#nextSlide').click(function () {
            _c.nextSlide();
        });
    
	}(window.carousels = window.carousels || {}, window.jQuery));

    (function (kportal, viewer, usersettings, recover, login, signup, routing, $, undefined) {

        var rt = window.location.hash.slice(2);
        
        var _r = {

        	menuMain : function () {
            	$('#MenuMainDiv').show();
            	$('#MenuPortalDiv').hide();
            	$('#MenuLogoutDiv').hide();
        	},

        	menuPortal : function () {
            	$('#MenuMainDiv').hide();
            	$('#MenuPortalDiv').show();
            	$('#MenuLogoutDiv').hide();
        	},

        	menuLogout : function () {
            	$('#MenuMainDiv').hide();
            	$('#MenuPortalDiv').hide();
            	$('#MenuLogoutDiv').show();
        	},

        	hideAll : function () {
            	$('#page-index').hide();
            	$('#logindiv').hide();
            	$('#logoutdiv').hide();
            	$('#aboutdiv').hide();
            	$('#signupdiv').hide();
            	$('#portaldiv').hide();
            	$('#pdfdiv').hide();
            	$('#page404div').hide();
            	$('#activationFailedDiv').hide();
            	$('#alreadyActivatedDiv').hide();
            	$('#activationSuccessfulDiv').hide();
            	$('#signupActivationDiv').hide();
            	$('#recoverdiv').hide();
            	$('#recovereddiv').hide();
            	$('#usersettingsdiv').hide();
            	$('#usersettingsfaileddiv').hide();
        	},

        	notFound : function (rt) {
            	if (_r.isLoggedIn()) {
                	window.location.href = '#/portal';
            	} else {
                	window.location.href = '#/';
            	}
        	},

        	aboutPage : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#aboutdiv').show();
        	},

        	welcome : function () {
            	$('#portalSmall').text(unescape($.cookie('kplgckie')));
        	},

        	portalPage : function () {
            	if (_r.isLoggedIn()) {
                	_r.welcome();
                	_r.menuPortal();
                	_r.hideAll();
                	$('#portaldiv').show();
            	} else {
                	window.location.href = '#/login';
            	}
        	},
        	
        	viewerPage : function () {
            	if (_r.isLoggedIn()) {
                	_r.menuPortal();
                	_r.hideAll();
                	viewer.startViewer();
            	} else {
                	window.location.href = '#/login';
            	}
        	},

        	isLoggedIn : function () {
            	return ($.cookie('kplgckie')) ? true : false;
        	},

        	loginPage : function () {
            	if (_r.isLoggedIn()) {
                	window.location.href = '#/portal';
            	} else {
                	_r.menuMain();
                	_r.hideAll();
                	$('#logindiv').show();

                	login.initLoginDiv();
            	}
        	},
        	
        	recoverPage : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#recoverdiv').show();

            	recover.initRecoverDiv();
        	},
        	
        	recoveredPage : function () {
        		_r.menuMain();
            	_r.hideAll();
            	$('#recovereddiv').show();
        	},

        	logoutPage : function () {
            	if (_r.isLoggedIn()) {
                	_r.menuLogout();
                	_r.hideAll();
                	$('#logoutdiv').show();
            	} else {
                	window.location.href = '#/login';
            	}
        	},

        	signupPage : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#signupdiv').show();

            	signup.initSignupDiv();
        	},

        	homePage : function () {
            	if (_r.isLoggedIn()) {
                	window.location.href = '#/portal';
            	} else {
                	_r.menuMain();
                	_r.hideAll();
                	$('#page-index').show();
            	}
        	},

        	page404 : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#page404div').show();
        	},

        	render404 : function () {
            	window.location.href = '#/404';
        	},

        	activationFailedPage : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#activationFailedDiv').show();
        	},

        	alreadyActivated : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#alreadyActivatedDiv').show();
        	},

        	activationSuccessful : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#activationSuccessfulDiv').show();
        	},

        	signupActivation : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#signupActivationDiv').show();
        	},
        	
        	usersettingsPage : function () {
        		if (_r.isLoggedIn()) {
                	_r.menuPortal();
                	_r.hideAll();
                	
                	usersettings.initSettingsDiv();
            	} else {
                	window.location.href = '#/login';
            	}
        	},
        	
        	route2Page : function (rt) {
            	if (rt === '' && window.location.href.indexOf('#/') < 0) {
                	window.location.href += '#/';
                	_r.homePage();
            	} else if (rt === 'about') {
                	_r.aboutPage();
            	} else if (rt === 'login') {
                	_r.loginPage();
            	} else if (rt === 'recover') {
                	_r.recoverPage();
            	} else if (rt === 'recovered') {
                	_r.recoveredPage();
            	} else if (rt === 'signup') {
                	_r.signupPage();
            	} else if (rt === 'portal') {         
            		_r.portalPage();
            	} else if (rt === 'viewer') {
            		_r.viewerPage();
            	} else if (rt === 'logout') {
                	_r.logoutPage();
            	} else if (rt === '404') {
                	_r.page404();
            	} else if (rt === 'activationfailed') {
                	_r.activationFailedPage();
            	} else if (rt === 'activationusernotfound') {
                	_r.alreadyActivated();
            	} else if (rt === 'activationsuccessful') {
                	_r.activationSuccessful();
            	} else if (rt === 'signupactivation') {
                	_r.signupActivation();
            	} else if (rt === 'usersettings') {
                	_r.usersettingsPage();
            	}
        	}
        };

        var routes = {
        	'/': _r.homePage,
            '/about': _r.aboutPage,
            '/login': _r.loginPage,
            '/recover': _r.recoverPage,
            '/recovered': _r.recoveredPage,
            '/signup': _r.signupPage,
            '/portal': _r.portalPage,
            '/viewer': _r.viewerPage,
            '/logout': _r.logoutPage,
            '/404': _r.page404,
            '/activationfailed': _r.activationFailedPage,
            '/activationusernotfound': _r.alreadyActivated,
            '/activationsuccessful': _r.activationSuccessful,
            '/signupactivation': _r.signupActivation,
            '/usersettings' : _r.usersettingsPage
        };

        routing.start = function () {
            var router = new Router(routes).configure({
                notfound: _r.render404
            });
            router.init();

            _r.route2Page(rt);
        };

    }(window.kportal, window.viewer, window.usersettings, window.recover, window.login, 
    	window.signup, window.routing = window.routing || {}, window.jQuery));

	gb.dummyLoad();
	
	routing.start();
	carousels.start();
    
    recover.initRecoverDiv();
    login.initLoginDiv();
    signup.initSignupDiv();
	
    kportal.initKPortalDiv();
    viewer.hidePdfViewer();

})(window.jQuery);
/* DocPortal - Doksend - 2013 - http://doksend.com */
(function ($) {

    (function (gb, $, undefined) {
    
    	var pdfName, pdfUrl, pdfDownload, pdfSession;
    	
    	gb.doReject = function () {
    		$.reject({  
        		reject: { 
        			msie5: true,
        			msie6: true,
        			msie7: true,
        			msie8: true,
        			konqueror: true,
        			opera7: true, 
        			opera8 : true,
        			opera9 : true,
        			safari2 : true,
        			safari3 : true,
        			firefox1 : true, 
        			firefox2 : true,
        			unknown : false,
        			win : false,
        			mac : false, 
        			iphone : false,
        			linux : false, 
        			solaris : true
        		}, 
        		beforeReject: function() {  
            		if ($.os.name === 'iphone' || $.os.name === 'ipad' || $.os.name === 'unknown') {  
                		this.reject = { all : false };
            		}  
        		},
        		close: false, 
        		paragraph1: 'You will not be able to close this window.',  
        		paragraph2: 'To exit, you must ' +  
        		'<a href="javascript:window.location=window.location.pathname;">refresh the page</a>' + ' or upgrade your browser.' 
    		});  
    	
    		return false;  
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

        var signedAlready = false, aList = [];
        
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
        	
        	isApproved : function (str) {
        		var result = false;
        		
        		if (aList !== undefined && aList.length > 0) {
        			for (var i = 0; i < aList.length; i++) {
        				if (str.toLowerCase().indexOf(aList[i].toLowerCase()) >= 0) {
        					result = true;
        					break;
        				}
        			}
        		}
        		
        		return result;
        	},
        	
        	notApprovedMsg : function () {
        		$('#signupEmailValid').removeClass('smallStrong').addClass('smallWeek');
            	$('#signupEmailValid').text('This email has not yet been invited to the service, sorry');
        	},

        	ShowOrHideEmailMsg : function () {
            	if ($('#signupUserName').val() !== '') {
                	if (_s.ValidEmail()) {
                		if (_s.isApproved($('#signupUserName').val())) {
                    		_s.ShowValidEmailMsg();
                    	}
                    	else {
                    		_s.notApprovedMsg();
                    	}
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
            	if ((_s.NotEmpty()) && (_s.PwdNoMatch()) && (_s.ValidFreeMail()) && 
            		(_s.ValidEmail()) && (_s.isApproved($('#signupUserName').val()))) {
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
        	
        	getAList : function () {
        		$.getJSON('k4e2550htyjrtyj4345435/alist', function(data) {
  					aList = [];
 
  					$.each(data, function(key, val) {
    					aList.push(key);
  					});
				});
        	},
        	
        	initSignupDiv : function () {
            	_s.hideAllSignupMesssages();
            	_s.clearFields();
            	_s.ClearUserAndPwds();
            	_s.getAList();

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
        
        $('#signupfirstName').on('input', function (e) {
        	_s.hideAllSignupMesssages();
            _s.ShowOrHideBth();
        });

        $('#signuplastName').keyup(function (e) {
            if (e.which !== 13) {
                _s.hideAllSignupMesssages();
            }

            _s.ShowOrHideBth();
        });
        
        $('#signuplastName').on('input', function (e) {
        	_s.hideAllSignupMesssages();
            _s.ShowOrHideBth();
        });
        
        $('#signupUserName').keypress(function (e) {
            if ((e.which === 13) && ($('#signupUserName').val() !== '')) {
                $('#signupPassword').focus();
            }
        });
        
        $('#signupUserName').on('input', function (e) {
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
            if ((e.which === 13) && (_s.NotEmpty()) && (_s.isApproved($('#signupUserName').val()))) {
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
    
    	var items = [], itemsRaw = [], categ = [], categItems = [], itemsSearched = [], ac = [],
    		prevSearch = '';
    
    	var _k = {
    		
    		clearSearchField : function () {
    			$('#searchKPortal').val('');
    		},
    		
    		clnKey : function (ky) {
    			return ky.slice(ky.indexOf(']') + 2);
    		}, 
    		
    		gtCKey : function (ky) {
    			return ky.substring(ky.indexOf('[') + 1, ky.indexOf(']'));
    		},
    		
    		getDesc : function (str) {
    			var result = '';
    			
    			for (var i = 0; i <= str.length - 1; i++) {
    				if (isNaN(str[i])) {
    					result += str[i];
    				}
    				else {
    					break;
    				}
    			}
    			
    			return result;
    		},
    		
    		getNum : function (str) {
    			var result = '';
    			
    			for (var i = 0; i <= str.length - 1; i++) {
    				if (!isNaN(str[i])) {
    					result += str[i];
    				}
    				else {
    					break;
    				}
    			}
    			
    			return result;
    		},
    		
    		isDirectMatch : function (str) {
    			return ($.inArray(str, ac) >= 0) ? true : false;
    		},
    		
    		getCategories : function () {
    			$('#namescleardiv').hide();
    			
    			$.getJSON('k4e2550htyjrtyj4345435/categories', function(data) {
    				categ = [];
    				
    				$.each(data, function(key, val) {
    					categ.push('<li class="bg-color-blueLight fg-color-white"><a href=""><div class="icon"><img src="images/word2013icon.png" /></div><div class="data"><h4 id="catnh" class="fg-color-blueDark">' + key + '</h4><p>' + val + ' document(s)</p></div></a></li>');
  					});
  					
  					$('<ul>', {
    					html: categ.join('')
  					}).appendTo('#categories');
  					
  					$('#categoriesdiv').show();
    			});
    		},
    		
    		getItems : function () {
    			$.getJSON('k4e2550htyjrtyj4345435/articles', function(data) {
    				
  					items = [];
  					itemsRaw = [];
  					categItems = [];
 
  					$.each(data, function(key, val) {
  						var ky = _k.clnKey(key), 
  							ct = _k.gtCKey(key);
  						
  						var itm = '<li class="bg-color-blueLight fg-color-blue"><a href="' + val + '"><div class="icon"><img src="images/word2013icon.png" /></div><div class="data"><h4 id="catnh" class="fg-color-blueDark">' + ky + '</h4></div></a></li>';
  						
    					items.push(itm);
    					categItems.push('[' + ct + ']|' + itm);
    					itemsRaw.push(ky);
    					ac.push(ky);
  					});
 
  					$('<ul>', {
    					html: items.join('')
  					}).appendTo('#names');
  					
  					$('#search').autocomplete({
  						lookup: ac,
    					onSelect: function (data) {
    						console.log(data.value);
    						var str = data.value.toString().replace('<strong>', '').replace('</strong>', '');
    						
    						$('#search').val(str);
        					_k.triggerSearch(13, str, true);
    					}
					});
				});
    		},
    		
    		addListItems : function () {
    			_k.getItems();
    		},
    		
    		initKPortalDiv : function () {
    			_k.clearSearchField();
    			_k.getCategories();
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
    				
    				for (var i = 0; i <= itemsRaw.length - 1; i++) {
    					if (itemsRaw[i].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
    						if ($.inArray(items[i], itemsSearched) < 0) {
    							itemsSearched.push(items[i]);
    						}
    					}
    				}
    				
    				if (itemsSearched.length > 0) {
    					$('#names').html('');
    					
    					$('<ul>', {
    						html: itemsSearched.join('')
  						}).appendTo('#names');
  						
  						//_k.updateImgIcon();
  						
  						$('#nameslistDiv').hide();
  						$('#nameslistDiv').slideDown(50);
  						$('#namesdiv').show();
  						$('#categoriesdiv').hide();
    				}
    			}
    			else {
    				_k.defaultList();
    				
    				$('#nameslistDiv').hide();
    				$('#namesdiv').hide();
    				
    				$('#categoriesdiv').show();
    			}
    		},
    		
    		search : function (str, direct) {
    			var arrStr = str.split(' ');
    			
    			itemsSearched = [];
    			
    			if (direct) {
    				_k.doSearch(str);
    				$('#names').highlight(str);
    			}
    			else {
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
    			}
    		},
    		
    		runCategSearch : function (txt) {
    			if (txt !== '') {
    				itemsSearched = [];
    				
    				for (var i = 0; i <= categItems.length - 1; i++) {
    					if (categItems[i].toLowerCase().indexOf(txt.toLowerCase()) >= 0) {
    						itemsSearched.push(_k.clnKey(categItems[i]));
    					}
    				}
    				
    				if (itemsSearched.length > 0) {
    					$('#names').html('');
    					
    					$('<ul>', {
    						html: itemsSearched.join('')
  						}).appendTo('#names');
  						
  						//_k.updateImgIcon();
  						
  						$('#nameslistDiv').show();
  						$('#namesdiv').show();
  						$('#namescleardiv').show();
  						$('#ctNameDiv').show();
  						
  						$('#categoriesdiv').hide();
    				}
    			}
    		},
    		
    		updateImgIcon : function () {
    			$('#nameslistDiv').hide();
    			
    			$('#names').children().each(function() {
    				var imgs = $(this).find('img');
    					
    				for (var i = 0; i <= imgs.length - 1; i++) {	
    					if ($(imgs[i]).attr('src') === '') {
    						$(imgs[i]).attr('src', 'images/word2013icon.png');
    					}
    				}
				});
				
				$('#nameslistDiv').show();
    		},
    		
    		gDefaults : function () {
    			_k.defaultList();
    				
    			$('#nameslistDiv').hide();
    			$('#namesdiv').hide();
    			$('#ctNameDiv').hide();
    			$('#categoriesdiv').show();
  				
  				$('#highlight-plugin').removeHighlight();
    		},
    		
    		runSearch : function (direct) {
    			if ($('#search').val() !== '') {
    				_k.search($("#search").val(), direct);
    				$('#namescleardiv').hide();
    			}
    			else {
    				_k.gDefaults();
    			}
    		},
    		
    		showHideResultMsgDiv : function (str) {
    			if (str === '') {
    				$('#nameslistDivResult').hide();
    			}
    			else {
    				$('#nameslistDivResult').show();
    			}
    		},
    		
    		triggerSearch : function (e, str, direct) {
    			if (e === 13) {
    				_k.runSearch(direct);
    				prevSearch = str;
    			}
    			else if (str === '') {
    				_k.gDefaults();
    			}
    		
    			_k.showHideResultMsgDiv($('#search').val());
    		},
    		
    		getAc : function () {
    			console.log(ac);
    			return ac;
    		}
    		
    	};
    	
    	kportal.initKPortalDiv = function () {
    		_k.initKPortalDiv();
    	};
    	
    	$('#search').keyup(function (e) {
    		var str = $.trim($('#search').val()).replace('<strong>', '').replace('</strong>', '');
    		
    		if (_k.isDirectMatch(str)) {
    			_k.triggerSearch(e.keyCode, str, true);
    		}
    		else {
    			_k.triggerSearch(e.keyCode, str, false);
    		}
    	});
        
        $('#namescleardiva').click(function (e) {
        	e.preventDefault();
        	
        	$('#names').html('');
        	_k.gDefaults();
        });
        
        $('#categories').delegate('a', 'click', function(e) {
        	var ct = _k.getDesc($(this).text()),
        		dc = _k.getNum($(this).text());
        	
        	$('#namescleardivaCtN').text(ct);
        	$('#namescleardivaCtD').text('There are ' + dc + ' document(s) tagged in this category...');
        	
        	e.preventDefault();
        	_k.runCategSearch(ct);
        	
        	$(window).scrollTop(0);
        });
        
        $('#names').delegate('a', 'click', function(e) {
        	e.preventDefault();
        	
        	gb.pdfName = $(this).text();
        	
        	var str = $(this).attr('href');
        	var arr = str.split('|');
        		
        	gb.pdfUrl = arr[0];
        	gb.pdfDownload = arr[1];
        	gb.pdfSession = arr[2];
        	
        	window.location.href = '#/viewer';
        });
    
    }(window.gb, window.kportal = window.kportal || {}, window.jQuery));
    
    (function (gb, viewer, $, undefined) {
    	
    	var _v = {
    	
    		hidePdfViewer : function () {
                $('#pdfdiv').hide();
                $('#mypdfdocdiv').hide();
                $('#preparing_mypdfdocdiv').hide();
                $('#mypdfdoc').attr('src', '');
    		},
    		
    		stViewer : function () {		
				$('#pdfh1').text('Article: ' + gb.pdfUrl);
				$('#pdfN').text(gb.pdfName);
			
				$(window).scrollTop(0);
    		
    			_v.showPdfViewer();
    		},
    		
    		showPdfViewer : function () {	
    			$('#pdfdiv').show();
    			
    			$('#mypdfdocdiv').hide();
                $('#mypdfdoc').attr('src', '');
                $('#preparing_mypdfdocdiv').show();
    			
    			$.getJSON('http://www.doksend.com/kbportal/getsession.php?', {
    					uuid: gb.pdfSession
  					},
  					function(data) {
  						$('#preparing_mypdfdocdiv').hide();
  						$('#mypdfdoc').attr('src', 'https://crocodoc.com/view/' + data);
  						$('#mypdfdocdiv').delay(1250).slideDown(2550);
  					}
  				);
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
            	$('#LoginRememberMe').removeAttr('value');
        	},

        	showCheckedRememberMe : function () {
            	$('#LoginRememberMe').attr('checked', '1');
            	$('#LoginRememberMe').attr('value', '1');
        	},

        	initCheckBoxes : function () {
            	_l.showUncheckedRememberMe();
        	},

        	get_splgrm : function () {
            	splgrm = $.cookie('kplgrm');
            	
            	if (splgrm !== null) {
            		$('#loginUserName').val(splgrm);
            	}
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
            	//_l.initCheckBoxes();
            	_l.clearLoginFields();
            	_l.hideLoginButton();
            	_l.hideLoginUserNotFoundOnKey();
            	_l.hideLoginUserExceptionOnKey();

                _l.get_splgrm();
            	_l.getCheckboxesStatus();

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
        		if ($('#loginUserName').val() !== 'radkiddo' && $('#loginUserName').val() !== '') {
        			gb.showHideEmailMsg(ve, vfe, '#loginEmailMsg');
        		}
        		else {
        			$('#loginEmailMsg').text('');
        		}
    		}
        };
        
        $('#LoginRememberMe').click(function () {
        	if ($('#LoginRememberMe').attr('checked')) {
        		$('#LoginRememberMe').removeAttr('checked');
        		$('#LoginRememberMe').removeAttr('value', '');
        	}
        	else {
        		$('#LoginRememberMe').attr('checked', '');
        		$('#LoginRememberMe').attr('value', '1');
        	}
        });
        
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
        
        $('#loginUserName').on('input', function (e) {
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
        
        $('#settingsfirstName').on('input', function (e) {
        	_us.hideAllSettingsMesssages();
            _us.ShowOrHideBth();
        });

        $('#settingslastName').keyup(function (e) {
            if (e.which !== 13) {
                _us.hideAllSettingsMesssages();
            }

            _us.ShowOrHideBth();
        });
        
        $('#settingslastName').on('input', function (e) {
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
        
        $('#recoverEmail').on('input', function (e) {
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
            	$('#getchromediv').hide();
        	},

        	notFound : function (rt) {
            	if (_r.isLoggedIn()) {
                	window.location.href = '#/portal';
            	} else {
                	window.location.href = '#/';
            	}
        	},
        	
        	getChromePage : function () {
        		_r.menuMain();
            	_r.hideAll();
            	$('#getchromediv').show();
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
            	} else if (rt === 'getchrome') {
                	_r.getChromePage();
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
            '/getchrome': _r.getChromePage,
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
    
    if (!jQuery.browser.mobile) {
   		gb.doReject();
   	}
	
	routing.start();
	carousels.start();
    
    recover.initRecoverDiv();
    login.initLoginDiv();
    signup.initSignupDiv();
	
    kportal.initKPortalDiv();
    viewer.hidePdfViewer();

})(window.jQuery);
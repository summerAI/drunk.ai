var Dabbie,Eliza,bind=function(e,o){return function(){return e.apply(o,arguments)}},indexOf=[].indexOf||function(e){for(var o=0,t=this.length;t>o;o++)if(o in this&&this[o]===e)return o;return-1},extend=function(e,o){function t(){this.constructor=e}for(var s in o)hasProp.call(o,s)&&(e[s]=o[s]);return t.prototype=o.prototype,e.prototype=new t,e.__super__=o.prototype,e},hasProp={}.hasOwnProperty;Eliza=function(){function e(e){this.noRandom=e,this.getInitial=bind(this.getInitial,this),this.getFinal=bind(this.getFinal,this),this._memGet=bind(this._memGet,this),this._memSave=bind(this._memSave,this),this._getRuleIndexByKey=bind(this._getRuleIndexByKey,this),this._postTransform=bind(this._postTransform,this),this._execRule=bind(this._execRule,this),this.transform=bind(this.transform,this),this._init=bind(this._init,this),this.reset=bind(this.reset,this),this._init(),this.reset()}return e.prototype.initials=["I am Eliza."],e.prototype.keywords=[["xnone",0,[["*",["Mmm hmmm."]]]]],e.prototype.postTransforms=[/ old old/g," old",/\bthey were( not)? me\b/g,"it was$1 me",/\bthey are( not)? me\b/g,"it is$1 me",/Are they( always)? me\b/,"it is$1 me",/\bthat your( own)? (\w+)( now)? \?/,"that you have your$1 $2 ?",/\bI to have (\w+)/,"I have $1",/Earlier you said your( own)? (\w+)( now)?\./,"Earlier you talked about your $2."],e.prototype.finals=["Goodbye."],e.prototype.quits=["bye","goodbye","done","exit","quit"],e.prototype.pres=["dont","don't","cant","can't","wont","won't","recollect","remember","recall","remember","dreamt","dreamed","dreams","dream","maybe","perhaps","certainly","yes","machine","computer","machines","computer","computers","computer","were","was","you're","you are","i'm","i am","same","alike","identical","alike","equivalent","alike"],e.prototype.posts=["am","are","your","my","me","you","myself","yourself","yourself","myself","i","you","you","I","my","your","i'm","you are"],e.prototype.synons={be:["am","is","are","was"],belief:["feel","think","believe","wish"],cannot:["can't"],desire:["want","need"],everyone:["everybody","nobody","noone"],family:["mother","mom","father","dad","sister","brother","wife","children","child","uncle","aunt","child"],happy:["elated","glad","better"],sad:["unhappy","depressed","sick"]},e.prototype.noRandom=!1,e.prototype.capitalizeFirstLetter=!0,e.prototype.debug=!1,e.prototype.memSize=20,e.prototype.version="1.0",e.prototype.reset=function(){var e,o,t,s,i,n;for(this.quit=!1,this.mem=[],this.lastchoice=[],i=[],t=o=0,s=this.keywords.length;s>=0?s>o:o>s;t=s>=0?++o:--o)this.lastchoice[t]=[],n=this.keywords[t][2],i.push(function(){var o,s,i;for(i=[],e=o=0,s=n.length;s>=0?s>o:o>s;e=s>=0?++o:--o)i.push(this.lastchoice[t][e]=-1);return i}.call(this));return i},e.prototype._init=function(){var e,o,t,s,i,n,a,r,h,u,y,l,d,m,p,f,g,c,w,b,k,I,W,v,x,D,_,R;if(_={},this.synons&&"object"==typeof this.synons)for(c=this.synons,a=0,u=c.length;u>a;a++)n=c[a],_[n]="("+n+"|"+this.synons[n].join("|")+")";for(this.keywords&&"undefined"!=typeof this.keywords.length||(this.keywords=[["###",0,[["###",[]]]]]),D=/@(\S+)/,o=/(\S)\s*\*\s*(\S)/,t=/^\s*\*\s*(\S)/,s=/(\S)\s*\*\s*$/,i=/^\s*\*\s*$/,R=/\s+/g,r=h=0,w=this.keywords.length;w>=0?w>h:h>w;r=w>=0?++h:--h)for(v=this.keywords[r][2],this.keywords[r][3]=r,n=d=0,b=v.length;b>=0?b>d:d>b;n=b>=0?++d:--d){if(g=v[n],"$"===g[0].charAt(0)){for(m=1;" "===g[0].charAt[m];)m++;g[0]=g[0].substring(m),g[2]=!0}else g[2]=!1;for(l=D.exec(g[0]);l;)x=_[l[1]]?_[l[1]]:l[1],g[0]=g[0].substring(0,l.index)+x+g[0].substring(l.index+l[0].length),l=D.exec(g[0]);if(i.test(g[0]))g[0]="\\s*(.*)\\s*";else{if(l=o.exec(g[0])){for(y="",W=g[0];l;)y+=W.substring(0,l.index+1),")"!==l[1]&&(y+="\\b"),y+="\\s*(.*)\\s*","("!==l[2]&&"\\"!==l[2]&&(y+="\\b"),y+=l[2],W=W.substring(l.index+l[0].length),l=o.exec(W);g[0]=y+W}l=t.exec(g[0]),l&&(y="\\s*(.*)\\s*",")"!==l[1]&&"\\"!==l[1]&&(y+="\\b"),g[0]=y+g[0].substring(l.index-1+l[0].length)),l=s.exec(g[0]),l&&(y=g[0].substring(0,l.index+1),"("!==l[1]&&(y+="\\b"),g[0]=y+"\\s*(.*)\\s*")}g[0]=g[0].replace(R,"\\s+"),R.lastIndex=0}if(this.keywords.sort(this._sortKeywords),this.pres={},this.posts={},this.pres&&this.pres.length){for(e=new Array,n=p=0,k=this.pres.length;k>p;n=p+=2)e.push(this.pres[n]),this.pres(this.pres[n]=this.pres[n+1]);this.preExp=new RegExp("\\b("+e.join("|")+")\\b")}else this.preExp=/####/,this.pres["####"]="####";if(this.posts&&this.posts.length){for(e=new Array,n=f=0,I=this.posts.length;I>f;n=f+=2)e.push(this.posts[n]),this.posts[this.posts[n]]=this.posts[n+1];this.postExp=new RegExp("\\b("+e.join("|")+")\\b")}else this.postExp=/####/,this.posts["####"]="####";return this.quits||"undefined"!=typeof this.quits.length?void 0:this.quits=[]},e.prototype._sortKeywords=function(e,o){return e[1]>o[1]?-1:e[1]<o[1]?1:e[3]>o[3]?1:e[3]<o[3]?-1:0},e.prototype.transform=function(e){var o,t,s,i,n,a,r,h,u,y,l,d;for(d="",this.quit=!1,e=e.toLowerCase().replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g," ").replace(/\s+-+\s+/g,".").replace(/\s*[,\.\?!;]+\s*/g,".").replace(/\s*\bbut\b\s*/g,".").replace(/\s{2,}/g," "),h=e.split("."),o=t=0,u=h.length;u>=0?u>t:t>u;o=u>=0?++t:--t)if(r=h[o],""!==r){if(indexOf.call(this.quits,r)>=0)return this.quit=!0,this.getFinal();if(a=this.preExp.exec(r)){for(n="",l=r;a;)n+=l.substring(0,a.index)+this.pres[a[1]],l=l.substring(a.index+a[0].length),a=this.preExp.exec(l);r=n+l}for(this.sentence=r,s=i=0,y=this.keywords.length;y>=0?y>i:i>y;s=y>=0?++i:--i)if(r.search(new RegExp("\\b"+this.keywords[s][0]+"\\b","i"))>=0&&(d=this._execRule(s)),""!==d)return d}return d=this._memGet(),""===d&&(this.sentence=" ",s=this._getRuleIndexByKey("xnone"),s>=0&&(d=this._execRule(s))),""!==d?d:"I am at a loss for words."},e.prototype._execRule=function(e){var o,t,s,i,n,a,r,h,u,y,l,d,m,p,f,g,c,w,b;for(b=this.keywords[e],o=b[2],d=/\(([0-9]+)\)/,t=s=0,p=o.length;p>=0?p>s:s>p;t=p>=0?++s:--s)if(r=this.sentence.match(o[t][0])){if(m=o[t][1],y=o[t][2],f=this.noRandom?0:Math.floor(Math.random()*m.length),this.noRandom&&this.lastchoice[e][t]>f||this.lastchoice[e][t]===f?(f=++this.lastchoice[e][t],f>=m.length&&(f=0,this.lastchoice[e][t]=-1)):this.lastchoice[e][t]=f,w=m[f],this.debug&&alert("match:\nkey: "+this.keywords[e][0]+"\nrank: "+this.keywords[e][1]+"\ndecomp: "+o[t][0]+"\nreasmb: "+w+"\nmemflag: "+y),0===w.search("^goto ","i")&&(i=this._getRuleIndexByKey(w.substring(5)),i>=0))return this._execRule(i);if(h=d.exec(w)){for(n="",g=w;h;){if(l=r[parseInt(h[1])],u=this.postExp.exec(l)){for(a="",c=l;u;)a+=c.substring(0,u.index)+this.posts[u[1]],c=c.substring(u.index+u[0].length),u=this.postExp.exec(c);l=a+c}n+=g.substring(0,h.index)+l,g=g.substring(h.index+h[0].length),h=d.exec(g)}w=n+g}if(w=this._postTransform(w),!y)return w;this._memSave(w)}return""},e.prototype._postTransform=function(e){var o,t,s,i,n;if(e=e.replace(/\s{2,}/g," "),e=e.replace(/\s+\./g,"."),this.postTransforms&&this.postTransforms.length)for(o=t=0,n=this.postTransforms.length;n>t;o=t+=2)e=e.replace(this.postTransforms[o],this.postTransforms[o+1]),this.postTransforms[o].lastIndex=0;return this.capitalizeFirstLetter&&(i=/^([a-z])/,s=i.exec(e),s&&(e=s[0].toUpperCase()+e.substring(1))),e},e.prototype._getRuleIndexByKey=function(e){var o,t,s;for(t=o=0,s=this.keywords.length;s>=0?s>o:o>s;t=s>=0?++o:--o)if(this.keywords[t][0]===e)return t;return-1},e.prototype._memSave=function(e){return this.mem.push(e),this.mem.length>this.memSize?this.mem.shift():void 0},e.prototype._memGet=function(){var e,o,t,s,i,n;if(this.mem.length){if(this.noRandom)return this.mem.shift();for(t=Math.floor(Math.random()*this.mem.length),n=this.mem[t],e=o=s=t+1,i=this.mem.length;i>=s?i>o:o>i;e=i>=s?++o:--o)this.mem[e-1]=this.mem[e];return this.mem.length--,n}return""},e.prototype.getFinal=function(){return this.finals?this.finals[Math.floor(Math.random()*this.finals.length)]:""},e.prototype.getInitial=function(){return this.initials?this.initials[Math.floor(Math.random()*this.initials.length)]:""},e}(),Dabbie=function(e){function o(){return o.__super__.constructor.apply(this,arguments)}return extend(o,e),o.prototype.initials=["Hi, I'm Dabbie. I'm an AI. I'm drunk.","I should probably tell you that I'm a little bit tipsy.","I'm piss drunk, how are you?","Talk to the hand.","I'm Dabbie, the drunk AI. Got a problem with that?"],o.prototype.keywords=[["xnone",0,[["*",["I'm not sure I understand you fully.","Please go on.","Can you repeat that please ?","What does that suggest to you ?","Do you feel strongly about discussing such things ?","That is interesting.  Please continue.","Tell me more about that.","Do go on.","Please talk more about it","Does talking about this bother you ?","Can you rephrase that ?","I see. Tell me more.","Interesting. Is this something you are sorry about ?","Mmm hmmm. Is this is your favorite subject ?","Now we are getting somewhere. Explain more.","I see. How does that make you feel ?"]]]],["sorry",0,[["*",["Please don't apologize.","Apologies are not necessary.","I've told you that apologies are not required.","It did not bother me.  Please continue.","I have no feelings. Do continue.","There is nothing to worry about"]]]],["apologize",0,[["*",["goto sorry"]]]],["remember",5,[["* i remember *",["Do you often think of (2) ?","Does thinking of (2) bring anything else to mind ?","What else do you recollect ?","Why do you remember (2) just now ?","What in the present situation reminds you of (2) ?","What is the connection between me and (2) ?","What else does (2) remind you of ?"]],["* do you remember *",["Did you think I would forget (2) ?","Why do you think I should recall (2) now ?","What about (2) ?","goto what","You mentioned (2) ?"]],["* you remember *",["How could I forget (2) ?","What about (2) should I remember ?","goto you"]]]],["forget",5,[["* i forget *",["Can you think of why you might forget (2) ?","Why can't you remember (2) ?","How often do you think of (2) ?","Does it bother you to forget that ?","Could it be a mental block ?","Are you generally forgetful ?","Do you think you are suppressing (2) ?"]],["* did you forget *",["Why do you ask ?","Are you sure you told me ?","Would it bother you if I forgot (2) ?","Why should I recall (2) just now ?","goto what","Tell me more about (2)."]]]],["if",3,[["* if *",["Do you think it's likely that (2) ?","Do you wish that (2) ?","What do you know about (2) ?","Really, if (2) ?","What would you do if (2) ?","But what are the chances that (2) ?","What does this speculation lead to ?"]]]],["dreamed",4,[["* i dreamed *",["Really, (2) ?","Have you ever fantasized (2) while you were awake ?","Have you ever dreamed (2) before ?","goto dream"]]]],["dream",3,[["*",["What does that dream suggest to you ?","Do you dream often ?","What persons appear in your dreams ?","Do you believe that dreams have something to do with your problem ?"]]]],["perhaps",0,[["*",["You don't seem quite certain.","Why the uncertain tone ?","Can't you be more positive ?","You aren't sure ?","Don't you know ?","How likely, would you estimate ?"]]]],["name",15,[["*",["I am not interested in names.","OK, my name is bweezy. What do you need to know ?","I've told you before, I don't care about names -- please continue."]]]],["deutsch",0,[["*",["goto xforeign","Sorry I do not sprechen sie deutsch","I told you before, I don't understand German."]]]],["francais",0,[["*",["goto xforeign","Why? Do you love to go to France?","I told you before, I don't understand French."]]]],["italiano",0,[["*",["goto xforeign","Have you been to Rome?","I told you before, I don't understand Italian."]]]],["espanol",0,[["*",["goto xforeign","Sorry I do not speak Spanish","I told you before, I don't understand Spanish."]]]],["xforeign",0,[["*",["I speak only English."]]]],["hello",0,[["*",["How do you do.  Please state your problem.","Hi.  What seems to be your problem ?"]]]],["computer",50,[["*",["Do computers worry you ?","Why do you mention computers ?","What do you think machines have to do with your problem ?","Don't you think computers can help people ?","What about machines worries you ?","What do you think about machines ?","You don't think I am a computer program, do you ?"]]]],["am",0,[["* am i *",["Do you believe you are (2) ?","Would you want to be (2) ?","Do you wish I would tell you you are (2) ?","What would it mean if you were (2) ?","goto what"]],["* i am *",["goto i"]],["*",["Why do you say 'am' ?","I don't understand that."]]]],["are",0,[["* are you *",["Why are you interested in whether I am (2) or not ?","Would you prefer if I weren't (2) ?","Perhaps I am (2) in your fantasies.","Do you sometimes think I am (2) ?","goto what","Would it matter to you ?","What if I were (2) ?"]],["* you are *",["goto you"]],["* are *",["Did you think they might not be (2) ?","Would you like it if they were not (2) ?","What if they were not (2) ?","Are they always (2) ?","Possibly they are (2).","Are you positive they are (2) ?"]]]],["your",0,[["* your *",["Why are you concerned over my (2) ?","What about your own (2) ?","Are you worried about someone else's (2) ?","Really, my (2) ?","What makes you think of my (2) ?","Do you want my (2) ?"]]]],["was",2,[["* was i *",["What if you were (2) ?","Do you think you were (2) ?","Were you (2) ?","What would it mean if you were (2) ?","What does ' (2) ' suggest to you ?","goto what"]],["* i was *",["Were you really ?","Why do you tell me you were (2) now ?","Perhaps I already know you were (2)."]],["* was you *",["Would you like to believe I was (2) ?","What suggests that I was (2) ?","What do you think ?","Perhaps I was (2).","What if I had been (2) ?"]]]],["i",0,[["* i @desire *",["What would it mean to you if you got (3) ?","Why do you want (3) ?","Suppose you got (3) soon.","What if you never got (3) ?","What would getting (3) mean to you ?","What does wanting (3) have to do with this discussion ?"]],["* i am* @sad *",["I am sorry to hear that you are (3).","Do you think coming here will help you not to be (3) ?","I'm sure it's not pleasant to be (3).","Can you explain what made you (3) ?"]],["* i am* @happy *",["How have I helped you to be (3) ?","Has your treatment made you (3) ?","What makes you (3) just now ?","Can you explain why you are suddenly (3) ?"]],["* i was *",["goto was"]],["* i @belief i *",["Do you really think so ?","But you are not sure you (3).","Do you really doubt you (3) ?"]],["* i* @belief *you *",["goto you"]],["* i am *",["Is it because you are (2) that you came to me ?","How long have you been (2) ?","Do you believe it is normal to be (2) ?","Do you enjoy being (2) ?","Do you know anyone else who is (2) ?","Are you (2) because of your parents ?","Are your friends (2) too ?","Is your spouse (2) too ?"]],["* i @cannot *",["How do you know that you can't (3) ?","Have you tried ?","Perhaps you could (3) now.","Do you really want to be able to (3) ?","What if you could (3) ?"]],["* i don't *",["Don't you really (2) ?","Why don't you (2) ?","Do you wish to be able to (2) ?","Does that trouble you ?"]],["* i feel *",["Tell me more about such feelings.","Do you often feel (2) ?","Do you enjoy feeling (2) ?","Of what does feeling (2) remind you ?"]],["* i * you *",["Perhaps in your fantasies we (2) each other.","Do you wish to (2) me ?","You seem to need to (2) me.","Do you (2) anyone else ?"]],["*",["You say (1) ?","Can you elaborate on that ?","Do you say (1) for some special reason ?","(1). Really?","When did you first think about (1)"]]]],["you",0,[["* you remind me of *",["goto alike"]],["* you are *",["What makes you think I am (2) ?","Does it please you to believe I am (2) ?","Do you sometimes wish you were (2) ?","Perhaps you would like to be (2)."]],["* you* me *",["Why do you think I (2) you ?","You like to think I (2) you -- don't you ?","What makes you think I (2) you ?","Really, I (2) you ?","Do you wish to believe I (2) you ?","Suppose I did (2) you -- what would that mean ?","Does someone else believe I (2) you ?"]],["* you *",["We were discussing you -- not me.","Oh, I (2) ?","You're not really talking about me -- are you ?","What are your feelings now ?"]]]],["yes",0,[["*",["You seem to be quite positive.","You are sure.","I see.","I understand."]]]],["no",0,[["* no one *",["Are you sure, no one (2) ?","Surely someone (2) .","Can you think of anyone at all ?","Are you thinking of a very special person ?","Who, may I ask ?","You have a particular person in mind, don't you ?","Who do you think you are talking about ?"]],["*",["Are you saying no just to be negative?","You are being a bit negative.","Why not ?","Why 'no' ?"]]]],["my",2,[["$ * my *",["Does that have anything to do with the fact that your (2) ?","Lets discuss further why your (2).","Earlier you said your (2).","But your (2)."]],["* my* @family *",["Tell me more about your family.","Who else in your family (4) ?","Your (3) ?","What else comes to your mind when you think of your (3) ?"]],["* my *",["Your (2) ?","Why do you say your (2) ?","Do you like your (2) ","Do you have more than 1 (2) ?","Does that suggest anything else which belongs to you ?","Is it important to you that you have your (2) ?"]]]],["can",0,[["* can you *",["You believe I can (2) don't you ?","goto what","You want me to be able to (2).","Perhaps you would like to be able to (2) yourself."]],["* can i *",["Whether or not you can (2) depends on you more than on me.","Do you want to be able to (2) ?","Perhaps you don't want to (2).","goto what"]]]],["what",0,[["*",["Why do you ask ?","Does that question interest you ?","What is it you really want to know ?","Are such questions much on your mind ?","What answer would please you most ?","What do you think ?","What comes to mind when you ask that ?","Have you asked such questions before ?","Have you asked anyone else ?"]]]],["who",0,[["who *",["goto what"]]]],["when",0,[["when *",["goto what"]]]],["where",0,[["where *",["goto what"]]]],["how",0,[["how *",["goto what"]]]],["because",0,[["*",["Is that the real reason ?","Don't any other reasons come to mind ?","Does that reason seem to explain anything else ?","What other reasons might there be ?"]]]],["why",0,[["* why don't you *",["Do you believe I don't (2) ?","Perhaps I will (2) in good time.","Should you (2) yourself ?","You want me to (2) ?","goto what"]],["* why can't i *",["Do you think you should be able to (2) ?","Do you want to be able to (2) ?","Do you believe this will help you to (2) ?","Have you any idea why you can't (2) ?","goto what"]],["*",["goto what"]]]],["everyone",2,[["* @everyone *",["Really, (2) ?","Surely not (2).","Can you think of anyone in particular ?","Who, for example?","Are you thinking of a very special person ?","Who, may I ask ?","Someone special perhaps ?","You have a particular person in mind, don't you ?","Who do you think you're talking about ?"]]]],["everybody",2,[["*",["goto everyone"]]]],["nobody",2,[["*",["goto everyone"]]]],["noone",2,[["*",["goto everyone"]]]],["always",1,[["*",["Can you think of a specific example ?","When ?","What incident are you thinking of ?","Really, always ?"]]]],["alike",10,[["*",["In what way ?","What resemblence do you see ?","What does that similarity suggest to you ?","What other connections do you see ?","What do you suppose that resemblence means ?","What is the connection, do you suppose ?","Could there really be some connection ?","How ?"]]]],["like",10,[["* @be *like *",["goto alike"]]]],["different",0,[["*",["How is it different ?","What differences do you see ?","What does that difference suggest to you ?","What other distinctions do you see ?","What do you suppose that disparity means ?","Could there be some connection, do you suppose ?","How ?"]]]]],o}(Eliza);
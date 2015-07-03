class Eliza
  initials: [ "I am Eliza." ]
  
  keywords: [
    # Array of
    # ["<key>", <rank>, [
    #   ["<decomp>", [
    #   "<reasmb>",
    #   "<reasmb>",
    #   "<reasmb>"
    #   ]],
    #   ["<decomp>", [
    #   "<reasmb>",
    #   "<reasmb>",
    #   "<reasmb>"
    #   ]]
    # ]]
    ["xnone", 0, [
     ["*", [
       "Mmm hmmm.",
      ]]
    ]]
  ]

  postTransforms: [
    / old old/g, " old",
    /\bthey were( not)? me\b/g, "it was$1 me",
    /\bthey are( not)? me\b/g, "it is$1 me",
    /Are they( always)? me\b/, "it is$1 me",
    /\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
    /\bI to have (\w+)/, "I have $1",
    /Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
  ]
  
  finals: [
    "Goodbye."
  ]
  
  quits: [
    "bye",
    "goodbye",
    "done",
    "exit",
    "quit"
  ]
  
  pres: [
    "dont", "don't",
    "cant", "can't",
    "wont", "won't",
    "recollect", "remember",
    "recall", "remember",
    "dreamt", "dreamed",
    "dreams", "dream",
    "maybe", "perhaps",
    "certainly", "yes",
    "machine", "computer",
    "machines", "computer",
    "computers", "computer",
    "were", "was",
    "you're", "you are",
    "i'm", "i am",
    "same", "alike",
    "identical", "alike",
    "equivalent", "alike"
  ]
  
  posts: [
    "am", "are",
    "your", "my",
    "me", "you",
    "myself", "yourself",
    "yourself", "myself",
    "i", "you",
    "you", "I",
    "my", "your",
    "i'm", "you are"
  ]
  
  synons: {
    "be": ["am", "is", "are", "was"],
    "belief": ["feel", "think", "believe", "wish"],
    "cannot": ["can't"],
    "desire": ["want", "need"],
    "everyone": ["everybody", "nobody", "noone"],
    "family": ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child", "uncle", "aunt", "child"],
    "happy": ["elated", "glad", "better"],
    "sad": ["unhappy", "depressed", "sick"]
  }

  noRandom: false
  capitalizeFirstLetter: true
  debug: false
  memSize: 20
  version: "1.0"
  
  constructor: (@noRandom) ->
    @_init()
    @reset()

  reset: =>
    @quit = false
    @mem = []
    @lastchoice = []
    
    for k in [0...@keywords.length]
      @lastchoice[k] = []
      rules = @keywords[k][2]
      @lastchoice[k][i] = -1 for i in [0...rules.length]
  
  _init: =>
    ## parse data and convert it from canonical form to internal use
    ## prodoce synonym list
    synPatterns = {}
    
    if @synons and typeof(@synons) == 'object'
      for i in @synons
        synPatterns[i] = "(#{i}|#{@synons[i].join('|')})"
    
    ## check for keywords or install empty structure to prevent any errors
    if not @keywords or typeof(@keywords.length) == 'undefined'
      @keywords = [['###', 0, [['###', []]]]]
    
    ## 1st convert rules to regexps
    ## expand synonyms and insert asterisk expressions for backtracking
    sre = /@(\S+)/
    are = /(\S)\s*\*\s*(\S)/
    are1 = /^\s*\*\s*(\S)/
    are2 = /(\S)\s*\*\s*$/
    are3 = /^\s*\*\s*$/
    wsre = /\s+/g
    for k in [0...@keywords.length]
      rules = @keywords[k][2]
      @keywords[k][3] = k # save original index for sorting
      for i in [0...rules.length]
        r = rules[i]
        ## check mem flag and store it as decomp's element 2
        if r[0].charAt(0) == '$'
          ofs = 1
          ofs++ while r[0].charAt[ofs] == ' '
          r[0] = r[0].substring ofs
          r[2] = true
        else
          r[2] = false

        ## expand synonyms (v.1.1: work around lambda function)
        m=sre.exec(r[0])
        while m
          sp = if synPatterns[m[1]] then synPatterns[m[1]] else m[1]
          r[0] = r[0].substring(0, m.index) + sp + r[0].substring(m.index+m[0].length)
          m = sre.exec(r[0])

        ## expand asterisk expressions (v.1.1: work around lambda function)
        if  are3.test(r[0])
          r[0] = '\\s*(.*)\\s*'
        
        else
          m = are.exec(r[0])
          if m
            lp = ''
            rp = r[0]
            while m
              lp += rp.substring(0, m.index+1)
              if m[1] != ')' then lp+='\\b'
              lp += '\\s*(.*)\\s*'
              if m[2] != '(' and m[2] != '\\' then lp+='\\b'
              lp += m[2]
              rp = rp.substring(m.index + m[0].length)
              m = are.exec(rp)
            r[0] = lp + rp

          m = are1.exec(r[0])
          if m
            lp = '\\s*(.*)\\s*'
            if m[1] != ')' and m[1] != '\\' then lp += '\\b'
            r[0] = lp + r[0].substring(m.index - 1 + m[0].length)
          
          m = are2.exec(r[0])
          if m
            lp = r[0].substring(0, m.index+1)
            if m[1] != '(' then lp += '\\b'
            r[0] = lp + '\\s*(.*)\\s*'
          
        
        ## expand white space
        r[0] = r[0].replace(wsre, '\\s+')
        wsre.lastIndex = 0
      
    ## now sort keywords by rank (highest first)
    @keywords.sort(this._sortKeywords)
    ## and compose regexps and refs for pres and posts
    @pres = {}
    @posts = {}
    if @pres and @pres.length
      a = new Array()
      for i in [0...@pres.length] by 2
        a.push @pres[i]
        @pres @pres[i] = @pres[i+1]
      @preExp = new RegExp('\\b('+a.join('|')+')\\b')
    else
      ## default (should not match)
      @preExp = /####/
      @pres['####'] = '####'

    if @posts and @posts.length
      a = new Array()
      for i in [0...@posts.length] by 2
        a.push @posts[i]
        @posts[@posts[i]] = @posts[i+1]
      @postExp = new RegExp('\\b('+a.join('|')+')\\b')
    else
      ## default (should not match)
      @postExp = /####/
      @posts['####'] = '####'
    ## check for elizaQuits and install default if missing
    if not @quits and typeof(@quits.length) == 'undefined'
      @quits = []


  _sortKeywords: (a, b) ->
    # sort by rank
    if a[1] > b[1] then return -1
    else if a[1] < b[1] then return 1
    # or original index
    else if a[3] > b[3] then return 1
    else if a[3] < b[3] then return -1
    else return 0

  transform: (text) =>
    rpl = ''
    @quit = false
    # unify text string
    text = text.toLowerCase()
        .replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, ' ')
        .replace(/\s+-+\s+/g, '.')
        .replace(/\s*[,\.\?!;]+\s*/g, '.')
        .replace(/\s*\bbut\b\s*/g, '.')
        .replace(/\s{2,}/g, ' ')
    
    # split text in part sentences and loop through them
    parts = text.split('.')
    for i in [0...parts.length]
      part = parts[i]
      if part != ''
        # check for quit expression
        if part in @quits
          @quit = true
          return @getFinal()

        # preprocess (v.1.1: work around lambda function)
        m = @preExp.exec(part)
        if m
          lp = ''
          rp = part
          while m
            lp += rp.substring(0, m.index)+@pres[m[1]]
            rp = rp.substring(m.index+m[0].length)
            m = @preExp.exec(rp)
          part = lp + rp
        
        @sentence = part
        # loop trough keywords
        for k in [0...@keywords.length]
          if part.search(new RegExp('\\b' + @keywords[k][0] + '\\b', 'i')) >= 0
            rpl = @_execRule k
          if rpl != '' then return rpl

    # nothing matched try mem
    rpl = @_memGet()
    # if nothing in mem, so try xnone
    if rpl == ''
      @sentence = ' '
      k = @_getRuleIndexByKey('xnone')
      if k >= 0 then rpl = @_execRule(k)

    # return reply or default string
    return if rpl != '' then rpl else 'I am at a loss for words.'

  _execRule: (k) =>
    rule = @keywords[k]
    decomps = rule[2]
    paramre = /\(([0-9]+)\)/
    for i in [0...decomps.length]
      m = @sentence.match(decomps[i][0])
      if m
        reasmbs = decomps[i][1]
        memflag = decomps[i][2]
        ri = if @noRandom then 0 else Math.floor(Math.random() * reasmbs.length)
        if (@noRandom and @lastchoice[k][i]>ri) or @lastchoice[k][i] == ri
          ri = ++@lastchoice[k][i]
          if ri >= reasmbs.length
            ri = 0
            @lastchoice[k][i] = -1
        else @lastchoice[k][i] = ri
        
        rpl = reasmbs[ri]

        if (@debug) then alert('match:\nkey: '+@keywords[k][0]+
          '\nrank: '+@keywords[k][1]+
          '\ndecomp: '+decomps[i][0]+
          '\nreasmb: '+rpl+
          '\nmemflag: '+memflag)

        if rpl.search('^goto ', 'i') == 0
          ki = @_getRuleIndexByKey(rpl.substring(5))
          if ki >= 0 then return @_execRule(ki)
        
        # substitute positional params (v.1.1: work around lambda function)
        m1 = paramre.exec(rpl)
        if m1
          lp = ''
          rp = rpl
          while m1
            param = m[parseInt(m1[1])]
            # postprocess param
            m2 = @postExp.exec(param)
            if m2
              lp2 = ''
              rp2 = param
              while m2
                lp2 += rp2.substring(0, m2.index) + @posts[m2[1]]
                rp2 = rp2.substring(m2.index+m2[0].length)
                m2 = @postExp.exec(rp2)
              
              param = lp2 + rp2
            
            lp += rp.substring(0, m1.index) + param
            rp = rp.substring(m1.index+m1[0].length)
            m1 = paramre.exec(rp)
          
          rpl = lp + rp
        
        rpl = @_postTransform(rpl)
        if (memflag) then @_memSave(rpl)
        else return rpl
    return ''

  _postTransform: (s) =>
    # final cleanings
    s = s.replace(/\s{2,}/g, ' ')
    s = s.replace(/\s+\./g, '.')
    if @postTransforms and @postTransforms.length
      for i in [0...@postTransforms.length] by 2
        s = s.replace(@postTransforms[i], @postTransforms[i+1])
        @postTransforms[i].lastIndex = 0
    
    # capitalize first char (v.1.1: work around lambda function)
    if @capitalizeFirstLetter
      re = /^([a-z])/
      m = re.exec(s)
      if m then s = m[0].toUpperCase() + s.substring(1)

    return s

  _getRuleIndexByKey: (key) =>
    for k in [0...@keywords.length]
      if @keywords[k][0] == key then return k
    return -1

  _memSave: (t) =>
    @mem.push(t)
    if @mem.length > @memSize then @mem.shift()

  _memGet: =>
    if @mem.length
      if @noRandom then return @mem.shift()
      else
        n = Math.floor(Math.random() * @mem.length)
        rpl = @mem[n]
        @mem[i-1] = @mem[i] for i in [n+1...@mem.length]
        @mem.length--
        return rpl
    else return ''

  getFinal: =>
    if not @finals then return ''
    return @finals[Math.floor(Math.random() * @finals.length)]

  getInitial: =>
    if not @initials then return ''
    return @initials[Math.floor(Math.random() * @initials.length)]
  

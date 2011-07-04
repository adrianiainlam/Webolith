from django_assets import Bundle, register

# javascript

tableCreateJs = Bundle('js/wordwalls/csrfAjax.js', 
                        'js/wordwalls/challengeInfoProcess.js', 
                        'js/wordwalls/tableCreate.js',
                        filters='jsmin', 
                        output='js/wordwalls/packedTableCreate.js')
            
tableJs = Bundle('js/wordwalls/csrfAjax.js',
                'js/aerolith/json2.js',
                'js/wordwalls/challengeInfoProcess.js',
                'js/wordwalls/table.js',
                'js/wordwalls/tableTests.js', 
                filters = 'jsmin', 
                output='js/wordwalls/packedTable.js')
            
register('js_table_create', 'js/aerolith/jquery-1.6.1.min.js', 
                            'js/aerolith/jquery-ui-1.8.14.custom.min.js',
                            tableCreateJs)

register('js_table', 'js/aerolith/jquery-1.6.1.min.js', tableJs)

# css

tableCreateCss = Bundle('css/wordwalls/wordwallsCreateTable.css',
                        'css/redmond/jquery-ui-1.8.14.custom.css',
                        filters='cssmin',
                        output='css/wordwalls/packedWWCT.css')
       
tableCss = Bundle('css/wordwalls/wordwallsTableSS.css',
                    filters='cssmin',
                    output='css/wordwalls/packedWWT.css')
        
register('css_table_create', tableCreateCss)
register('css_table', tableCss)
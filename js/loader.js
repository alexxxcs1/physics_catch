
var LoadedRes=[];

function ResLoader(BaseUrl,test = 0,listen = 3000,projectName = '')
{
    if(test)
    {
        self.BaseUrl='http://127.0.0.1:'+listen+'/'+projectName+'/';
    }else {
        self.BaseUrl=BaseUrl;
    }

    self.interval_Rate=5;
    self.loadprocess=0;
    self.total=0;
    self.loaded=0;
    self.loadInterval=null;
    self.loadready=true;
    
}

ResLoader.prototype=
{

    getState:function()
    {
        return self.loadready;
    },
    setBaseUrl:function(url)
    {
        self.BaseUrl=url;
    },
    setRate:function(rate)
    {
        self.interval_Rate=rate;
    },
    getProcess:function()
    {
        return self.loadprocess;
    },
    load:function(resource_list,process,finish)
    {
        self.loadready=false;
        self.loaded=0;
        self.loadprocess=0;
        self.total=0;

        $.each(resource_list,function(key,val)
        {
            switch (key) {
                case 'img':
                    for(i=0;i<val.length;i++)
                    {
                        LoadedRes[val[i].name] = new Image();
                        LoadedRes[val[i].name].src=self.BaseUrl+'img/'+val[i].src;
                        console.log(LoadedRes[val[i].name].src);
                        LoadedRes[val[i].name].onload=function()
                        {
                            self.loaded++;
                        };
                        self.total++;
                    }

                    break;
                case 'group':
                    for(i=0;i<val.length;i++)
                    {
                        for (var j = 0; j <= val[i].endid; j++) {
                            console.log(val[i].name+j);
                            LoadedRes[val[i].name+j]=new Image();
                            LoadedRes[val[i].name+j].src=self.BaseUrl+'img/'+val[i].srcname+j+val[i].type;

                            console.log(LoadedRes[val[i].name+j].src);

                            LoadedRes[val[i].name+j].onload = function()
                            {
                                self.loaded++;
                            };
                            self.total++;
                        }
                    }
                    break;
            }
        });
        self.loadInterval=setInterval(function()
        {
            if(typeof(process)=="function"){
                if (self.loadprocess<Math.floor(self.loaded/self.total*100)) {
                    self.loadprocess++;
                    process(self.loadprocess);
                }
                if (self.loadprocess==100) {
                    self.loadready=true;
                    clearInterval(self.loadInterval);
                    if(typeof(finish)=='function')
                    {
                        finish();
                    }
                }
            }else{
                if (self.loaded==self.total) {
                    self.loadready=true;
                    clearInterval(self.loadInterval);
                    if(typeof(finish)=='function')
                    {
                        finish();
                    }
                }
            }


        },self.interval_Rate);
    }

};

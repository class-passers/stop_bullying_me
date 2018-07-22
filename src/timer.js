function func_interval(func, interval, params, id)
{
	this.func = func;
	this.interval = interval;
	this.count = 0;
	this.to_be_removed= false;
	this.params = params;
	this.id = id;
};
var Time = {
    last : new Date().getTime(),
    now : null,
    delta : 0,
	totalSec : 0,
	waiting : [],
	repeating : [],
	id : 0,
	
	Wait : function(func, interval, ...params){
		this.id++;
		this.waiting.push(new func_interval(func, interval, params, this.id));
		return this.id;
		},
	
	Repeat : function(func, interval, ...params){
		this.id++;
		this.repeating.push(new func_interval(func, interval, params, this.id)); 
		return this.id;
		},
	
	Waiting : function(){
		for(var i = 0; i < this.waiting.length; i++)
		{
			this.waiting[i].count += this.delta;
			if(this.waiting[i].count >= this.waiting[i].interval)
			{
				if(this.waiting[i].params.length == 0)
					this.waiting[i].func();
				else
					this.waiting[i].func.apply(this.waiting[i].func, this.waiting[i].params);
				this.waiting[i].to_be_removed = true;
			}
		}
		this.waiting = this.waiting.filter(function(obj){return obj.to_be_removed === false;});
	},
	
	Repeating : function(){
		for(var i = 0; i < this.repeating.length; i++)
		{
			this.repeating[i].count += this.delta;
			if(this.repeating[i].count >= this.repeating[i].interval)
			{
				if(this.repeating[i].params.length == 0)
					this.repeating[i].func();
				else
					this.repeating[i].func.apply(this.repeating[i].func.apply, this.repeating[i].params);
				this.repeating[i].count = 0;
			}
		}
		this.repeating = this.repeating.filter(function(obj){return obj.to_be_removed === false;});
	},
	ClearWait : function(id){
		for(var i = 0; i < this.waiting.length; i++)
		{
			if(this.waiting[i].id == id)
			{
				this.waiting[i].to_be_removed = true;
			}
		}
	},
	ClearRepeat : function(id){
		for(var i = 0; i < this.repeating.length; i++)
		{
			if(this.repeating[i].id == id)
			{
				this.repeating[i].to_be_removed = true;
			}
		}
	},
	Tick : function(){
		this.now = new Date().getTime();
		this.delta = (this.now - this.last) / 1000;
		this.last = this.now;
		this.totalSec += this.delta;
	}
	Reset : function(){
		this.totalSec = 0;
		this.id = 0;
		this.waiting = [];
		this.repeating = [];
	}
};
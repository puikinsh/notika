/*!
* Modern CounterUp - Compatible with Waypoints 4.x and jQuery 3.x
* Updated from original jquery.counterup.js for modern browsers
*/
(function($) {
    "use strict";
    
    $.fn.counterUp = function(options) {
        var settings = $.extend({
            time: 400,
            delay: 10,
            offset: '85%',
            beginAt: 0,
            formatter: function(n) {
                return n;
            },
            callback: function() {}
        }, options);
        
        return this.each(function() {
            var $this = $(this);
            var counter = {
                time: settings.time,
                delay: settings.delay,
                offset: settings.offset,
                beginAt: settings.beginAt,
                formatter: settings.formatter,
                callback: settings.callback
            };
            
            var runCounter = function() {
                var nums = [];
                var divisions = counter.time / counter.delay;
                var num = $this.attr('data-count') || $this.text();
                var isComma = /[0-9]+,[0-9]+/.test(num);
                num = num.replace(/,/g, '');
                var isInt = /^[0-9]+$/.test(num);
                var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
                var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;
                
                // Generate numbers array
                if (counter.beginAt > num) counter.beginAt = num;
                
                var i = counter.beginAt;
                for (var div = divisions; div >= (counter.beginAt / num * divisions); div--) {
                    var val = num / divisions * div;
                    if (isFloat) {
                        val = parseFloat(val.toFixed(decimalPlaces));
                    } else if (isInt) {
                        val = parseInt(val);
                    }
                    
                    var formattedVal = counter.formatter.call(this, val);
                    
                    if (isComma) {
                        while (/(\d+)(\d{3})/.test(formattedVal.toString())) {
                            formattedVal = formattedVal.toString().replace(/(\d+)(\d{3})/, '$1,$2');
                        }
                    }
                    nums.unshift(formattedVal);
                }
                
                $this.data('counterup-nums', nums);
                $this.text(counter.beginAt);
                
                // The actual counter function
                var f = function() {
                    var num = $this.data('counterup-nums');
                    if (num && num.length) {
                        $this.html(num.shift());
                        if (num.length) {
                            setTimeout(f, counter.delay);
                        } else {
                            counter.callback.call($this);
                            $this.data('counterup-nums', null);
                        }
                    }
                };
                
                setTimeout(f, counter.delay);
            };
            
            // Use modern Waypoints 4.x API if available
            if (window.Waypoint) {
                new Waypoint({
                    element: this,
                    handler: function() {
                        runCounter();
                        this.destroy(); // Trigger only once
                    },
                    offset: counter.offset
                });
            } else {
                // Fallback to Intersection Observer if Waypoints not available
                if ('IntersectionObserver' in window) {
                    var observer = new IntersectionObserver(function(entries) {
                        entries.forEach(function(entry) {
                            if (entry.isIntersecting) {
                                runCounter();
                                observer.unobserve(entry.target);
                            }
                        });
                    }, {
                        threshold: 0.5
                    });
                    observer.observe(this);
                } else {
                    // Final fallback - just run immediately
                    runCounter();
                }
            }
        });
    };
    
})(jQuery);
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * org.apache.flex.core.graphics.LinearGradient
 *
 * @fileoverview
 *
 * @suppress {checkTypes}
 */

goog.provide('org.apache.flex.core.graphics.LinearGradient');
goog.require('org.apache.flex.core.graphics.GradientBase');

/**
 * @constructor
 * @extends {org.apache.flex.core.graphics.GradientBase}
 * @implements {org.apache.flex.core.graphics.IFill}
 */
org.apache.flex.core.graphics.LinearGradient = function() {
  org.apache.flex.core.graphics.LinearGradient.base(this, 'constructor');
};
goog.inherits(org.apache.flex.core.graphics.LinearGradient, org.apache.flex.core.graphics.GradientBase);


/**
 * @private
 * @type {number}
 */
org.apache.flex.core.graphics.LinearGradient.prototype._scaleX;


/**
 * @expose
 * @return {number}
 */
org.apache.flex.core.graphics.LinearGradient.prototype.get_scaleX = function() {
  return this._scaleX;
};


/**
 * @expose
 * @param {number} value
 */
org.apache.flex.core.graphics.LinearGradient.prototype.set_scaleX = function(value) {
  this._scaleX = value;
};


/**
 * addFillAttrib()
 *
 * @expose
 * @param {org.apache.flex.core.graphics.GraphicShape} value The GraphicShape object on which the fill must be added.
 * @return {string}
 */
org.apache.flex.core.graphics.LinearGradient.prototype.addFillAttrib = function(value) {
  //Create and add a linear gradient def
  var svgNS = value.element.namespaceURI;
  var grad  = document.createElementNS(svgNS,'linearGradient');
  var gradientId = this.get_newId();
  grad.setAttribute('id',gradientId);

  //Set x1, y1, x2, y2 of gradient
  grad.setAttribute('x1','0%');
  grad.setAttribute('y1','0%');
  grad.setAttribute('x2','100%');
  grad.setAttribute('y2','0%');

  //Apply rotation to the gradient if get_rotatation() is a number
  if (this.get_rotation() )
  {
    grad.setAttribute('gradientTransform', 'rotate(' + this.get_rotation() +  ' 0.5 0.5)');
  }

  //Process gradient entries and create a stop for each entry  
  var entries = this.get_entries();
  for (var i=0;i<entries.length;i++)
  {
    var gradientEntry = entries[i];
    var stop = document.createElementNS(svgNS,'stop');
	//Set Offset
	stop.setAttribute('offset', String(gradientEntry.get_ratio() * 100) + '%');
	//Set Color
	var color = Number(gradientEntry.get_color()).toString(16);
	if (color.length == 1) color = '00' + color;
	if (color.length == 2) color = '00' + color;
	if (color.length == 4) color = '00' + color;
	stop.setAttribute('stop-color', '#' + String(color));
	//Set Alpha
	stop.setAttribute('stop-opacity', String(gradientEntry.get_alpha()));
	
    grad.appendChild(stop);
  }
  
  //Add defs element if not available already
  //Add newly created gradient to defs element
  var defs = value.element.querySelector('defs') ||
      value.element.insertBefore( document.createElementNS(svgNS,'defs'), value.element.firstChild);
  defs.appendChild(grad);
  
  //Return the fill attribute
  return 'fill:url(#' + gradientId + ')';
};


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.core.graphics.LinearGradient.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'LinearGradient', qName: 'org.apache.flex.core.graphics.LinearGradient'}], interfaces: [org.apache.flex.core.graphics.IFill] };

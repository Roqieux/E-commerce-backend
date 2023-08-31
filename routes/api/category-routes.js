const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try { 
    // find all categories
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that ID!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new category
    const categoryCreate = await Category.create(req.body);
    res.status(200).json(categoryCreate);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const categoryUpdate = await Category.update( 
      {
        // Category fields that can be updated in the request
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!categoryUpdate) {
      res.status(404).json({ message: 'No category found with that ID!' });
      return;
    }

    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
